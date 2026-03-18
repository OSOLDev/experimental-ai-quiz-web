import { CURRICULUM_DATA } from './curriculum-data.js';

/* ── Professions ── 
   IDs MUST match the keys in CURRICULUM_DATA for proper topic loading
═══════════════════════════════════════════════════════════════════════ */
export const PROFESSIONS = [
  { id: "LEC-URD-17", label_en: "Lecturer Urdu", label_ur: "لیکچرر اردو", icon: "fa-solid fa-book-open", lang: "ur" },
  { id: "LEC-ENG-17", label_en: "Lecturer English", label_ur: "لیکچرر انگریزی", icon: "fa-solid fa-spell-check", lang: "en" },
  { id: "LEC-ISL-17", label_en: "Lecturer Islamic Studies", label_ur: "لیکچرر اسلامیات", icon: "fa-solid fa-moon", lang: "ur" },
  { id: "LEC-PS-17", label_en: "Lecturer Pakistan Studies", label_ur: "لیکچرر مطالعہ پاکستان", icon: "fa-solid fa-flag", lang: "en" },
  { id: "LEC-ARB-17", label_en: "Lecturer Arabic", label_ur: "لیکچرر عربی", icon: "fa-solid fa-star-and-crescent", lang: "ur" },
  { id: "LEC-PRS-17", label_en: "Lecturer Persian", label_ur: "لیکچرر فارسی", icon: "fa-solid fa-feather-pointed", lang: "ur" },
  { id: "LEC-HIS-17", label_en: "Lecturer History", label_ur: "لیکچرر تاریخ", icon: "fa-solid fa-landmark", lang: "en" },
  { id: "LEC-POL-17", label_en: "Lecturer Political Science", label_ur: "لیکچرر سیاسیات", icon: "fa-solid fa-scale-balanced", lang: "en" },
  { id: "LEC-ECO-17", label_en: "Lecturer Economics", label_ur: "لیکچرر معاشیات", icon: "fa-solid fa-chart-line", lang: "en" },
  { id: "LEC-EDU-17", label_en: "Lecturer Education", label_ur: "لیکچرر تعلیم", icon: "fa-solid fa-school", lang: "en" },
  { id: "LEC-PHY-17", label_en: "Lecturer Physics", label_ur: "لیکچرر طبیعیات", icon: "fa-solid fa-atom", lang: "en" },
  { id: "LEC-CHM-17", label_en: "Lecturer Chemistry", label_ur: "لیکچرر کیمیا", icon: "fa-solid fa-flask", lang: "en" },
  { id: "LEC-MTH-17", label_en: "Lecturer Mathematics", label_ur: "لیکچرر ریاضی", icon: "fa-solid fa-square-root-variable", lang: "en" },
  { id: "LEC-CS-17", label_en: "Lecturer Computer Science", label_ur: "لیکچرر کمپیوٹر سائنس", icon: "fa-solid fa-laptop-code", lang: "en" },
  { id: "LEC-BOT-17", label_en: "Lecturer Botany", label_ur: "لیکچرر نباتیات", icon: "fa-solid fa-seedling", lang: "en" },
  { id: "LEC-ZOO-17", label_en: "Lecturer Zoology", label_ur: "لیکچرر حیوانیات", icon: "fa-solid fa-paw", lang: "en" },
  { id: "LEC-STA-17", label_en: "Lecturer Statistics", label_ur: "لیکچرر شماریات", icon: "fa-solid fa-chart-bar", lang: "en" },
  { id: "LEC-GEO-17", label_en: "Lecturer Geography", label_ur: "لیکچرر جغرافیہ", icon: "fa-solid fa-earth-asia", lang: "en" },
  { id: "LEC-COM-17", label_en: "Lecturer Commerce", label_ur: "لیکچرر تجارت", icon: "fa-solid fa-briefcase", lang: "en" },
  { id: "LEC-BIO-17", label_en: "Lecturer Biology", label_ur: "لیکچرر بیالوجی", icon: "fa-solid fa-microscope", lang: "en" },
  { id: "SA-16", label_en: "Senior Auditor", label_ur: "سینئر آڈیٹر", icon: "fa-solid fa-calculator", lang: "en" },
];

export const PROF_MAP = Object.fromEntries(PROFESSIONS.map(p => [p.id, p]));

/* ═══════════════════════════════════════════════════════════════════════
   CURRICULUM HELPER FUNCTIONS
   Use these for the new 3-level navigation (Profession → Topic → Subtopic)
═══════════════════════════════════════════════════════════════════════ */

/**
 * Get all topics for a profession from CURRICULUM_DATA
 * @param {string} professionId - The profession ID (e.g., 'LEC-URD-17')
 * @returns {Array} Array of topic objects with topic_id, title_en, title_ur, and subtopics
 */
export function getTopicsForProfession(professionId) {
  const curriculum = CURRICULUM_DATA[professionId];
  return curriculum?.topics || [];
}

/**
 * Get a specific topic by ID
 * @param {string} professionId - The profession ID
 * @param {string} topicId - The topic ID (e.g., 'LEC-URD-17_T01')
 * @returns {Object|null} Topic object or null if not found
 */
export function getTopicById(professionId, topicId) {
  const topics = getTopicsForProfession(professionId);
  return topics.find(t => t.topic_id === topicId) || null;
}

/**
 * Get all subtopics for a specific topic
 * @param {string} professionId - The profession ID
 * @param {string} topicId - The topic ID
 * @returns {Array} Array of subtopic objects
 */
export function getSubtopicsForTopic(professionId, topicId) {
  const topic = getTopicById(professionId, topicId);
  return topic?.subtopics || [];
}

/**
 * Get a specific subtopic by ID
 * @param {string} professionId - The profession ID
 * @param {string} topicId - The topic ID
 * @param {string} subtopicId - The subtopic ID (e.g., 'LEC-URD-17_T01_S01')
 * @returns {Object|null} Subtopic object or null if not found
 */
export function getSubtopicById(professionId, topicId, subtopicId) {
  const subtopics = getSubtopicsForTopic(professionId, topicId);
  return subtopics.find(s => s.subtopic_id === subtopicId) || null;
}

/**
 * Get profession info from CURRICULUM_DATA (extended version)
 * @param {string} professionId - The profession ID
 * @returns {Object|null} Extended profession object with topics or null
 */
export function getProfessionExtended(professionId) {
  return CURRICULUM_DATA[professionId] || PROF_MAP[professionId] || null;
}

/**
 * Build a map of all topics across all professions for quick lookup
 * @returns {Object} Map of topic_id to topic data with profession info
 */
export function buildTopicMap() {
  const topicMap = {};
  for (const [profId, profData] of Object.entries(CURRICULUM_DATA)) {
    for (const topic of (profData.topics || [])) {
      topicMap[topic.topic_id] = {
        ...topic,
        profession_id: profId,
        profession_title_en: profData.title_en,
        profession_title_ur: profData.title_ur,
        profession_lang: profData.language
      };
    }
  }
  return topicMap;
}

/**
 * Build a map of all subtopics for quick lookup
 * @returns {Object} Map of subtopic_id to subtopic data with topic and profession info
 */
export function buildSubtopicMap() {
  const subtopicMap = {};
  for (const [profId, profData] of Object.entries(CURRICULUM_DATA)) {
    for (const topic of (profData.topics || [])) {
      for (const subtopic of (topic.subtopics || [])) {
        subtopicMap[subtopic.subtopic_id] = {
          ...subtopic,
          topic_id: topic.topic_id,
          topic_title_en: topic.title_en,
          topic_title_ur: topic.title_ur,
          profession_id: profId,
          profession_title_en: profData.title_en,
          profession_title_ur: profData.title_ur,
          profession_lang: profData.language
        };
      }
    }
  }
  return subtopicMap;
}

// Pre-build maps for performance
export const TOPIC_MAP = buildTopicMap();
export const SUBTOPIC_MAP = buildSubtopicMap();

/* ── Translations ── */
export const T = {
  en: {
    brand_name: "AJK PSC Prep", brand_sub: "Exam Platform",
    login_title: "Welcome Back", login_sub: "Sign in to your exam account",
    login_email: "Email Address", login_pass: "Password", login_btn: "Sign In",
    err_invalid: "Invalid email or password", err_expired: "Account expired. Contact administrator.",
    err_generic: "Login failed. Please try again.",
    choose_topic: "Choose Your Exam", choose_desc: "Select a topic to start your practice session.",
    locked: "Not in your plan",
    configure: "Configure Assessment", configure_desc: "Select the number of questions for your session.",
    q_of: "Question {n} of {total}", submit_quiz: "Submit Quiz",
    answered_of: "{n} of {total} answered",
    pass_title: "Assessment Passed", fail_title: "Assessment Complete",
    verdict_pass: "✓ Passed", verdict_fail: "✗ Did not pass",
    correct: "Correct", incorrect: "Incorrect", skipped: "Skipped",
    review: "Detailed Review", new_assessment: "New Assessment",
    candidate: "Candidate Details", name: "Name", email: "Email",
    questions: "Questions", answered: "Answered", score: "Score", result: "Result",
    pass: "Pass", fail: "Fail", threshold: "Passing threshold 60%",
    generating: "Generating Quiz…", generating_sub: "AI is creating personalised questions for you.",
    back: "Back", next: "Next", submit: "Submit", cancel: "Cancel", confirm: "Confirm",
    unanswered: "You have {n} unanswered questions.",
    unanswered_tip: "Answer all questions for the best result.",
    submit_anyway: "Submit Anyway", review_unanswered: "Review Unanswered",
    your_answer: "Your answer", correct_answer: "Correct answer",
    count_label: "Number of Questions",
    count_info: "Larger quizzes take slightly longer. AI generates unique questions every time.",
    generate: "Generate Quiz",
    admin_dash: "Dashboard", admin_users: "Users", admin_results: "Results",
    add_user: "Add User", edit_user: "Edit User", save: "Save", delete: "Delete",
    confirm_delete: "Confirm Delete", logout: "Logout",
    total_users: "Total Users", active_users: "Active Users",
    total_results: "Total Results", avg_score: "Avg Score",
    user_name: "Name", user_email: "Email", user_phone: "Phone",
    user_start: "Start Date", user_expiry: "Expiry Date",
    user_topics: "Topics", user_notes: "Notes", user_pass: "Password",
    user_status: "Status", user_actions: "Actions",
    no_users: "No users yet.", no_results: "No results yet.",
    status_active: "Active", status_expired: "Expired", status_soon: "Expiring soon",
    time: "Time", quiz_id: "Quiz ID", preview_quiz: "Preview Quiz", quiz_cached: "Using saved quiz (AI unavailable).",
  },
  ur: {
    brand_name: "اے جے کے پی ایس سی", brand_sub: "امتحان پلیٹ فارم",
    login_title: "خوش آمدید", login_sub: "اپنے امتحان اکاؤنٹ میں سائن ان کریں",
    login_email: "ای میل پتہ", login_pass: "پاس ورڈ", login_btn: "سائن ان",
    err_invalid: "ای میل یا پاس ورڈ غلط ہے", err_expired: "اکاؤنٹ ختم ہو گیا۔ منتظم سے رابطہ کریں۔",
    err_generic: "لاگ ان ناکام ہوا۔ دوبارہ کوشش کریں۔",
    choose_topic: "اپنا امتحان منتخب کریں", choose_desc: "مشق شروع کرنے کے لیے موضوع منتخب کریں۔",
    locked: "آپ کے پلان میں شامل نہیں",
    configure: "تشخیص ترتیب دیں", configure_desc: "اپنے سیشن کے لیے سوالات کی تعداد منتخب کریں۔",
    q_of: "سوال {n} از {total}", submit_quiz: "کوئز جمع کریں",
    answered_of: "{n} از {total} جواب دیے",
    pass_title: "تشخیص کامیاب", fail_title: "تشخیص مکمل",
    verdict_pass: "✓ پاس", verdict_fail: "✗ پاس نہیں",
    correct: "درست", incorrect: "غلط", skipped: "چھوڑا",
    review: "تفصیلی جائزہ", new_assessment: "نئی تشخیص",
    candidate: "امیدوار کی تفصیلات", name: "نام", email: "ای میل",
    questions: "سوالات", answered: "جواب دیے", score: "اسکور", result: "نتیجہ",
    pass: "پاس", fail: "فیل", threshold: "پاسنگ حد ۶۰٪",
    generating: "کوئز بن رہا ہے…", generating_sub: "AI آپ کے لیے ذاتی سوالات بنا رہا ہے۔",
    back: "واپس", next: "اگلا", submit: "جمع کریں", cancel: "منسوخ", confirm: "تصدیق",
    unanswered: "آپ کے {n} سوالات کا جواب نہیں دیا گیا۔",
    unanswered_tip: "بہترین نتیجے کے لیے تمام سوالات کا جواب دیں۔",
    submit_anyway: "پھر بھی جمع کریں", review_unanswered: "جواب نہ دیے سوالات دیکھیں",
    your_answer: "آپ کا جواب", correct_answer: "درست جواب",
    count_label: "سوالات کی تعداد",
    count_info: "بڑے کوئز میں تھوڑا زیادہ وقت لگتا ہے۔ AI ہر بار منفرد سوالات تیار کرتا ہے۔",
    generate: "کوئز بنائیں",
    admin_dash: "ڈیش بورڈ", admin_users: "صارفین", admin_results: "نتائج",
    add_user: "صارف شامل کریں", edit_user: "صارف ترمیم کریں", save: "محفوظ کریں", delete: "حذف کریں",
    confirm_delete: "حذف کی تصدیق", logout: "لاگ آؤٹ",
    total_users: "کل صارفین", active_users: "فعال صارفین",
    total_results: "کل نتائج", avg_score: "اوسط اسکور",
    user_name: "نام", user_email: "ای میل", user_phone: "فون",
    user_start: "شروع کی تاریخ", user_expiry: "ختم کی تاریخ",
    user_topics: "موضوعات", user_notes: "نوٹس", user_pass: "پاس ورڈ",
    user_status: "حیثیت", user_actions: "عمل",
    no_users: "ابھی کوئی صارف نہیں۔", no_results: "ابھی کوئی نتائج نہیں۔",
    status_active: "فعال", status_expired: "ختم", status_soon: "جلد ختم",
    time: "وقت", quiz_id: "کوئز آئی ڈی", preview_quiz: "کوئز معائنہ", quiz_cached: "AI دستیاب نہیں، محفوظ کوئز استعمال ہوا۔",
  }
};
