const DEFAULT_MODELS = [
    { provider: 'gemini', id: 'gemini-flash-lite-latest' },
    { provider: 'gemini', id: 'gemini-flash-latest' },
    { provider: 'groq', id: 'openai/gpt-oss-120b' },
    { provider: 'cerebras', id: 'gpt-oss-120b' }
];

async function callLLM(provider, model, prompt, requireJson, env) {
    if (provider === 'gemini') {
        const apiKey = env.GEMINI_API_KEY;
        if (!apiKey) throw new Error("GEMINI_API_KEY missing");

        const payload = {
            contents: [{ parts: [{ text: prompt }] }],
        };

        if (requireJson) {
            payload.generationConfig = {
                responseMimeType: "application/json",
                responseSchema: {
                    type: "OBJECT",
                    properties: {
                        questions: {
                            type: "ARRAY",
                            items: {
                                type: "OBJECT",
                                properties: {
                                    question: { type: "STRING" },
                                    options: { type: "ARRAY", items: { type: "STRING" } },
                                    correctAnswer: { type: "STRING" }
                                },
                                required: ["question", "options", "correctAnswer"]
                            }
                        }
                    },
                    required: ["questions"]
                }
            };
        }

        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!res.ok) throw new Error(`[Gemini Error] ${res.status}: ${await res.text()}`);
        const data = await res.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.text;
    }

    if (provider === 'groq' || provider === 'cerebras') {
        const apiKey = provider === 'groq' ? env.GROQ_API_KEY : env.CEREBRAS_API_KEY;
        if (!apiKey) throw new Error(`${provider.toUpperCase()}_API_KEY missing`);

        const baseUrl = provider === 'groq' 
            ? 'https://api.groq.com/openai/v1/chat/completions' 
            : 'https://api.cerebras.ai/v1/chat/completions';

        const payload = {
            model: model,
            messages: [
                { 
                    role: "system", 
                    content: requireJson 
                        ? "You are an API that outputs strict, valid JSON. Ensure your response matches the exact structure requested without markdown formatting." 
                        : "You are a helpful AI assistant." 
                },
                { role: "user", content: prompt }
            ]
        };

        if (requireJson) {
            payload.response_format = { type: "json_object" };
        }

        const res = await fetch(baseUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!res.ok) throw new Error(`[${provider.toUpperCase()} Error] ${res.status}: ${await res.text()}`);
        const data = await res.json();
        return data.choices?.[0]?.message?.content;
    }

    throw new Error(`Unsupported provider: ${provider}`);
}

async function executeWithPrecedence(prompt, requireJson, env) {
    if (!env.KV_STORE) {
        throw new Error("KV_STORE binding is missing. Please bind a KV namespace in wrangler.toml.");
    }

    let models = await env.KV_STORE.get('MODEL_PRECEDENCE', 'json');
    if (!models || !Array.isArray(models) || models.length === 0) {
        models = [...DEFAULT_MODELS];
    }

    let lastError = null;

    for (let i = 0; i < models.length; i++) {
        const currentModel = models[i];
        console.log(`[Router] Attempting generation with ${currentModel.provider} / ${currentModel.id}`);

        try {
            const textContent = await callLLM(currentModel.provider, currentModel.id, prompt, requireJson, env);
            
            if (textContent) {
                console.log(`[Router] Success using ${currentModel.provider} / ${currentModel.id}`);
                return textContent;
            }
        } catch (error) {
            console.error(`[Router] Failure on ${currentModel.provider} / ${currentModel.id}:`, error.message);
            lastError = error;
            
            // Rotate the failed model to the end of the array
            const failedModel = models.splice(i, 1)[0];
            models.push(failedModel);
            
            // Commit the new precedence order to KV
            await env.KV_STORE.put('MODEL_PRECEDENCE', JSON.stringify(models));
            
            // Adjust loop index since we shifted the array left
            i--; 
        }
    }

    throw new Error(`All models exhausted. Last error: ${lastError?.message}`);
}

export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);

        const corsHeaders = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        };

        if (request.method === 'OPTIONS') {
            return new Response(null, { headers: corsHeaders });
        }

        if (url.pathname.startsWith('/api/generate')) {
            if (request.method !== 'POST') {
                return new Response(JSON.stringify({ error: `Method ${request.method} not allowed` }), { 
                    status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
                });
            }

            try {
                const body = await request.json();
                const { topic } = body;
                const count = [5, 15, 30, 50].includes(Number(body.count)) ? Number(body.count) : 50;
                if (!topic) {
                    return new Response(JSON.stringify({ error: 'Topic is required' }), { 
                        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
                    });
                }

                // Explicit JSON instruction in prompt acts as a fallback for models that don't strictly adhere to JSON mode
                const prompt = `Create a professional, challenging multiple-choice quiz about "${topic}". Provide exactly ${count} questions — no more, no fewer. The correct answer must perfectly match one of the options exactly. You must output strictly valid JSON matching this schema: { "questions": [ { "question": "...", "options": ["...", "...", "...", "..."], "correctAnswer": "..." } ] }`;
                
                const resultText = await executeWithPrecedence(prompt, true, env);

                return new Response(resultText, { 
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
                });

            } catch (error) {
                console.error("[API Error] /api/generate:", error.message);
                return new Response(JSON.stringify({ error: error.message }), { 
                    status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
                });
            }
        }

        if (url.pathname.startsWith('/test')) {
            if (request.method !== 'GET') {
                return new Response(JSON.stringify({ error: `Method ${request.method} not allowed` }), {
                    status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                });
            }

            const llm = url.searchParams.get('llm');
            const VALID_PROVIDERS = ['groq', 'gemini', 'cerebras'];

            if (!llm) {
                return new Response(JSON.stringify({
                    ok: false,
                    error: 'Missing required query parameter: llm. Usage: /test?llm=groq|gemini|cerebras'
                }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
            }

            if (!VALID_PROVIDERS.includes(llm)) {
                return new Response(JSON.stringify({
                    ok: false,
                    error: `Invalid provider "${llm}". Must be one of: ${VALID_PROVIDERS.join(', ')}`
                }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
            }

            // Pick the first model for this provider
            const model = DEFAULT_MODELS.find(m => m.provider === llm);
            if (!model) {
                return new Response(JSON.stringify({
                    ok: false,
                    error: `No model configured for provider "${llm}"`
                }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
            }

            // Check API key exists before even calling the LLM
            const keyMap = { gemini: 'GEMINI_API_KEY', groq: 'GROQ_API_KEY', cerebras: 'CEREBRAS_API_KEY' };
            const apiKey = env[keyMap[llm]];
            if (!apiKey) {
                return new Response(JSON.stringify({
                    ok: false,
                    error: `${keyMap[llm]} is not configured in environment secrets`
                }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
            }

            try {
                // Minimal prompt — just enough to get a valid response, wastes no tokens
                const reply = await callLLM(llm, model.id, 'Reply with only the word: true', false, env);
                const reachable = typeof reply === 'string' && reply.trim().length > 0;

                return new Response(JSON.stringify({
                    ok: reachable,
                    llm,
                    model: model.id,
                    response: reply?.trim() ?? null
                }), { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

            } catch (error) {
                console.error(`[API Error] /test?llm=${llm}:`, error.message);
                return new Response(JSON.stringify({
                    ok: false,
                    llm,
                    model: model.id,
                    error: error.message
                }), { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
            }
        }

        try {
            return await env.ASSETS.fetch(request);
        } catch (err) {
            return new Response('Not Found', { status: 404 });
        }
    }
};