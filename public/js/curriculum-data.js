/* ═══════════════════════════════════════════════════════════════════════
   CURRICULUM DATA - Profession Topics & Subtopics
   Career Boost Officers Academy — AJKPSC Exam Preparation Platform
   Covers: Lecturer BS-17 (Posts 1–20) & Senior Auditor BS-16 (Post 21)
   ═══════════════════════════════════════════════════════════════════════ */

export const CURRICULUM_DATA = {

  // ─────────────────────────────────────────────────────────────────────
  // POST 01 — Lecturer Urdu (BS-17)
  // ─────────────────────────────────────────────────────────────────────
  'LEC-URD-17': {
    post_id: 'LEC-URD-17',
    title_en: 'Lecturer Urdu',
    title_ur: 'لیکچرر اردو',
    grade: 'BS-17',
    language: 'ur',
    exam_weight_note: { top_3_topics: ['LEC-URD-17_T03', 'LEC-URD-17_T05', 'LEC-URD-17_T01'] },
    topics: [
      {
        topic_id: 'LEC-URD-17_T01', post_topic_id: 'POST_01_T01',
        title_en: 'Evolution of Urdu Literature', title_ur: 'اردو ادب کا ارتقاء',
        subtopics: [
          { subtopic_id: 'LEC-URD-17_T01_S01', title_en: 'Deccani Literature', title_ur: 'دکنی ادب' },
          { subtopic_id: 'LEC-URD-17_T01_S02', title_en: 'Delhi School', title_ur: 'دہلی اسکول' },
          { subtopic_id: 'LEC-URD-17_T01_S03', title_en: 'Lucknow School', title_ur: 'لکھنو اسکول' },
          { subtopic_id: 'LEC-URD-17_T01_S04', title_en: 'Modern Literature', title_ur: 'جدید ادب' },
          { subtopic_id: 'LEC-URD-17_T01_S05', title_en: 'Progressive Movement', title_ur: 'ترقی پسند تحریک' }
        ]
      },
      {
        topic_id: 'LEC-URD-17_T02', post_topic_id: 'POST_01_T02',
        title_en: 'Prose Genres', title_ur: 'اصناف نثر',
        subtopics: [
          { subtopic_id: 'LEC-URD-17_T02_S01', title_en: 'Novel', title_ur: 'ناول' },
          { subtopic_id: 'LEC-URD-17_T02_S02', title_en: 'Short Story', title_ur: 'افسانہ' },
          { subtopic_id: 'LEC-URD-17_T02_S03', title_en: 'Essay', title_ur: 'انشائیہ' },
          { subtopic_id: 'LEC-URD-17_T02_S04', title_en: 'Character Sketch', title_ur: 'خاکہ' },
          { subtopic_id: 'LEC-URD-17_T02_S05', title_en: 'Autobiography', title_ur: 'سوانح عمری' },
          { subtopic_id: 'LEC-URD-17_T02_S06', title_en: 'Travelogue', title_ur: 'سفرنامہ' },
          { subtopic_id: 'LEC-URD-17_T02_S07', title_en: 'Reportage', title_ur: 'رپورتاژ' }
        ]
      },
      {
        topic_id: 'LEC-URD-17_T03', post_topic_id: 'POST_01_T03',
        title_en: 'Poetry Genres', title_ur: 'اصناف شاعری',
        subtopics: [
          { subtopic_id: 'LEC-URD-17_T03_S01', title_en: 'Ghazal', title_ur: 'غزل' },
          { subtopic_id: 'LEC-URD-17_T03_S02', title_en: 'Nazm', title_ur: 'نظم' },
          { subtopic_id: 'LEC-URD-17_T03_S03', title_en: 'Marsiya', title_ur: 'مرثیہ' },
          { subtopic_id: 'LEC-URD-17_T03_S04', title_en: 'Qasida', title_ur: 'قصیدہ' },
          { subtopic_id: 'LEC-URD-17_T03_S05', title_en: 'Masnavi', title_ur: 'مثنوی' },
          { subtopic_id: 'LEC-URD-17_T03_S06', title_en: 'Rubai', title_ur: 'رباعی' },
          { subtopic_id: 'LEC-URD-17_T03_S07', title_en: 'Haiku', title_ur: 'ہائیکو' },
          { subtopic_id: 'LEC-URD-17_T03_S08', title_en: 'Free Verse', title_ur: 'آزاد نظم' }
        ]
      },
      {
        topic_id: 'LEC-URD-17_T04', post_topic_id: 'POST_01_T04',
        title_en: 'Urdu Grammar', title_ur: 'اردو قواعد',
        subtopics: [
          { subtopic_id: 'LEC-URD-17_T04_S01', title_en: 'Noun (Ism)', title_ur: 'اسم' },
          { subtopic_id: 'LEC-URD-17_T04_S02', title_en: 'Pronoun (Zameer)', title_ur: 'ضمیر' },
          { subtopic_id: 'LEC-URD-17_T04_S03', title_en: 'Verb (Fail)', title_ur: 'فعل' },
          { subtopic_id: 'LEC-URD-17_T04_S04', title_en: 'Adjective (Sifat)', title_ur: 'صفت' },
          { subtopic_id: 'LEC-URD-17_T04_S05', title_en: 'Particle (Harf)', title_ur: 'حرف' },
          { subtopic_id: 'LEC-URD-17_T04_S06', title_en: 'Sentence Types', title_ur: 'جملے کی اقسام' },
          { subtopic_id: 'LEC-URD-17_T04_S07', title_en: 'Idioms', title_ur: 'محاورے' },
          { subtopic_id: 'LEC-URD-17_T04_S08', title_en: 'Proverbs', title_ur: 'ضرب الامثال' }
        ]
      },
      {
        topic_id: 'LEC-URD-17_T05', post_topic_id: 'POST_01_T05',
        title_en: 'Major Poets and Writers', title_ur: 'اہم شعراء اور ادباء',
        subtopics: [
          { subtopic_id: 'LEC-URD-17_T05_S01', title_en: 'Mir Taqi Mir', title_ur: 'میر تقی میر' },
          { subtopic_id: 'LEC-URD-17_T05_S02', title_en: 'Ghalib', title_ur: 'غالب' },
          { subtopic_id: 'LEC-URD-17_T05_S03', title_en: 'Iqbal', title_ur: 'اقبال' },
          { subtopic_id: 'LEC-URD-17_T05_S04', title_en: 'Faiz', title_ur: 'فیض' },
          { subtopic_id: 'LEC-URD-17_T05_S05', title_en: 'Patras Bukhari', title_ur: 'پطرس بخاری' },
          { subtopic_id: 'LEC-URD-17_T05_S06', title_en: 'Manto', title_ur: 'منٹو' },
          { subtopic_id: 'LEC-URD-17_T05_S07', title_en: 'Qurat-ul-Ain Haider', title_ur: 'قرۃ العین حیدر' }
        ]
      },
      {
        topic_id: 'LEC-URD-17_T06', post_topic_id: 'POST_01_T06',
        title_en: 'Criticism and Research', title_ur: 'تنقید و تحقیق',
        subtopics: [
          { subtopic_id: 'LEC-URD-17_T06_S01', title_en: 'Principles of Criticism', title_ur: 'تنقید کے اصول' },
          { subtopic_id: 'LEC-URD-17_T06_S02', title_en: 'Research Methodology', title_ur: 'تحقیق کا منہج' },
          { subtopic_id: 'LEC-URD-17_T06_S03', title_en: 'History of Urdu Criticism', title_ur: 'اردو تنقید کی تاریخ' }
        ]
      },
      {
        topic_id: 'LEC-URD-17_T07', post_topic_id: 'POST_01_T07',
        title_en: 'Linguistics', title_ur: 'لسانیات',
        subtopics: [
          { subtopic_id: 'LEC-URD-17_T07_S01', title_en: 'Evolution of Urdu', title_ur: 'اردو کا ارتقاء' },
          { subtopic_id: 'LEC-URD-17_T07_S02', title_en: 'Urdu and Hindi', title_ur: 'اردو اور ہندی' },
          { subtopic_id: 'LEC-URD-17_T07_S03', title_en: 'Urdu Script', title_ur: 'اردو رسم الخط' },
          { subtopic_id: 'LEC-URD-17_T07_S04', title_en: 'Phonetics', title_ur: 'صوتیات' }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────────────
  // POST 02 — Lecturer English (BS-17)
  // ─────────────────────────────────────────────────────────────────────
  'LEC-ENG-17': {
    post_id: 'LEC-ENG-17',
    title_en: 'Lecturer English',
    title_ur: 'لیکچرر انگریزی',
    grade: 'BS-17',
    language: 'en',
    exam_weight_note: { top_3_topics: ['LEC-ENG-17_T01', 'LEC-ENG-17_T04', 'LEC-ENG-17_T05'] },
    topics: [
      {
        topic_id: 'LEC-ENG-17_T01', post_topic_id: 'POST_02_T01',
        title_en: 'English Literature — Poetry', title_ur: 'انگریزی شاعری',
        subtopics: [
          { subtopic_id: 'LEC-ENG-17_T01_S01', title_en: 'Chaucer', title_ur: 'چاسر' },
          { subtopic_id: 'LEC-ENG-17_T01_S02', title_en: 'Shakespeare Sonnets', title_ur: 'شیکسپیئر کے سونیٹ' },
          { subtopic_id: 'LEC-ENG-17_T01_S03', title_en: 'Milton', title_ur: 'ملٹن' },
          { subtopic_id: 'LEC-ENG-17_T01_S04', title_en: 'Romantic Poets', title_ur: 'رومانوی شاعر' },
          { subtopic_id: 'LEC-ENG-17_T01_S05', title_en: 'Victorian Poetry', title_ur: 'وکٹورین شاعری' },
          { subtopic_id: 'LEC-ENG-17_T01_S06', title_en: 'Modern Poetry', title_ur: 'جدید شاعری' },
          { subtopic_id: 'LEC-ENG-17_T01_S07', title_en: 'Postcolonial Poetry', title_ur: 'پوسٹ کالونیل شاعری' }
        ]
      },
      {
        topic_id: 'LEC-ENG-17_T02', post_topic_id: 'POST_02_T02',
        title_en: 'English Literature — Prose & Fiction', title_ur: 'انگریزی نثر اور فکشن',
        subtopics: [
          { subtopic_id: 'LEC-ENG-17_T02_S01', title_en: 'History of Novel', title_ur: 'ناول کی تاریخ' },
          { subtopic_id: 'LEC-ENG-17_T02_S02', title_en: 'Short Story', title_ur: 'مختصر کہانی' },
          { subtopic_id: 'LEC-ENG-17_T02_S03', title_en: 'Essays', title_ur: 'مضامین' },
          { subtopic_id: 'LEC-ENG-17_T02_S04', title_en: 'Major Novelists', title_ur: 'اہم ناول نگار' },
          { subtopic_id: 'LEC-ENG-17_T02_S05', title_en: 'Stream of Consciousness', title_ur: 'خیال کی بہاؤ' },
          { subtopic_id: 'LEC-ENG-17_T02_S06', title_en: 'Postmodern Fiction', title_ur: 'پوسٹ ماڈرن فکشن' }
        ]
      },
      {
        topic_id: 'LEC-ENG-17_T03', post_topic_id: 'POST_02_T03',
        title_en: 'English Literature — Drama', title_ur: 'انگریزی ڈرامہ',
        subtopics: [
          { subtopic_id: 'LEC-ENG-17_T03_S01', title_en: 'Greek Drama', title_ur: 'یونانی ڈرامہ' },
          { subtopic_id: 'LEC-ENG-17_T03_S02', title_en: 'Elizabethan Drama', title_ur: 'الزبتھن ڈرامہ' },
          { subtopic_id: 'LEC-ENG-17_T03_S03', title_en: 'Restoration Drama', title_ur: 'ریسٹوریشن ڈرامہ' },
          { subtopic_id: 'LEC-ENG-17_T03_S04', title_en: 'Modern Drama', title_ur: 'جدید ڈرامہ' },
          { subtopic_id: 'LEC-ENG-17_T03_S05', title_en: 'Theater of the Absurd', title_ur: 'تھیٹر آف دی ایبسورڈ' }
        ]
      },
      {
        topic_id: 'LEC-ENG-17_T04', post_topic_id: 'POST_02_T04',
        title_en: 'Literary Criticism & Theory', title_ur: 'ادبی تنقید اور نظریہ',
        subtopics: [
          { subtopic_id: 'LEC-ENG-17_T04_S01', title_en: 'New Criticism', title_ur: 'نیو تنقید' },
          { subtopic_id: 'LEC-ENG-17_T04_S02', title_en: 'Structuralism', title_ur: 'سٹرکچرل ازم' },
          { subtopic_id: 'LEC-ENG-17_T04_S03', title_en: 'Post-structuralism', title_ur: 'پوسٹ سٹرکچرل ازم' },
          { subtopic_id: 'LEC-ENG-17_T04_S04', title_en: 'Feminism', title_ur: 'فیمینزم' },
          { subtopic_id: 'LEC-ENG-17_T04_S05', title_en: 'Marxist Criticism', title_ur: 'مارکسی تنقید' },
          { subtopic_id: 'LEC-ENG-17_T04_S06', title_en: 'Post-colonialism', title_ur: 'پوسٹ کالونیل ازم' },
          { subtopic_id: 'LEC-ENG-17_T04_S07', title_en: 'Deconstruction', title_ur: 'ڈیکنسٹرکشن' }
        ]
      },
      {
        topic_id: 'LEC-ENG-17_T05', post_topic_id: 'POST_02_T05',
        title_en: 'English Grammar & Linguistics', title_ur: 'انگریزی گرامر اور لسانیات',
        subtopics: [
          { subtopic_id: 'LEC-ENG-17_T05_S01', title_en: 'Parts of Speech', title_ur: 'تقریر کے حصے' },
          { subtopic_id: 'LEC-ENG-17_T05_S02', title_en: 'Tenses', title_ur: 'ٹینس' },
          { subtopic_id: 'LEC-ENG-17_T05_S03', title_en: 'Sentence Structure', title_ur: 'جملے کی ساخت' },
          { subtopic_id: 'LEC-ENG-17_T05_S04', title_en: 'Phonology', title_ur: 'فونولوجی' },
          { subtopic_id: 'LEC-ENG-17_T05_S05', title_en: 'Morphology', title_ur: 'مورفولوجی' },
          { subtopic_id: 'LEC-ENG-17_T05_S06', title_en: 'Syntax', title_ur: 'سینٹیکس' },
          { subtopic_id: 'LEC-ENG-17_T05_S07', title_en: 'Semantics', title_ur: 'سیمینٹکس' },
          { subtopic_id: 'LEC-ENG-17_T05_S08', title_en: 'Pragmatics', title_ur: 'پریگمیٹکس' }
        ]
      },
      {
        topic_id: 'LEC-ENG-17_T06', post_topic_id: 'POST_02_T06',
        title_en: 'Writing Skills', title_ur: 'لکھنے کی مہارتیں',
        subtopics: [
          { subtopic_id: 'LEC-ENG-17_T06_S01', title_en: 'Essay Writing', title_ur: 'مضمون نگاری' },
          { subtopic_id: 'LEC-ENG-17_T06_S02', title_en: 'Précis Writing', title_ur: 'مختصر نگاری' },
          { subtopic_id: 'LEC-ENG-17_T06_S03', title_en: 'Comprehension', title_ur: 'سمجھ بوجھ' },
          { subtopic_id: 'LEC-ENG-17_T06_S04', title_en: 'Report Writing', title_ur: 'رپورٹ نگاری' },
          { subtopic_id: 'LEC-ENG-17_T06_S05', title_en: 'Academic Writing Conventions', title_ur: 'تعلیمی تحریری اصول' }
        ]
      },
      {
        topic_id: 'LEC-ENG-17_T07', post_topic_id: 'POST_02_T07',
        title_en: 'Language Teaching Methodology', title_ur: 'زبان کی تدریسی طریقہ کار',
        subtopics: [
          { subtopic_id: 'LEC-ENG-17_T07_S01', title_en: 'Grammar Translation Method', title_ur: 'گرامر ترجمہ کا طریقہ' },
          { subtopic_id: 'LEC-ENG-17_T07_S02', title_en: 'Direct Method', title_ur: 'براہ راست طریقہ' },
          { subtopic_id: 'LEC-ENG-17_T07_S03', title_en: 'Communicative Language Teaching', title_ur: 'مواصلاتی زبان کی تدریس' },
          { subtopic_id: 'LEC-ENG-17_T07_S04', title_en: 'Task-Based Learning', title_ur: 'کام پر مبنی سیکھنا' },
          { subtopic_id: 'LEC-ENG-17_T07_S05', title_en: 'Assessment in ELT', title_ur: 'ای ایل ٹی میں تشخیص' }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────────────
  // POST 03 — Lecturer Islamic Studies (BS-17)
  // ─────────────────────────────────────────────────────────────────────
  'LEC-ISL-17': {
    post_id: 'LEC-ISL-17',
    title_en: 'Lecturer Islamic Studies',
    title_ur: 'لیکچرر اسلامیات',
    grade: 'BS-17',
    language: 'ur',
    exam_weight_note: { top_3_topics: ['LEC-ISL-17_T02', 'LEC-ISL-17_T04', 'LEC-ISL-17_T01'] },
    topics: [
      {
        topic_id: 'LEC-ISL-17_T01', post_topic_id: 'POST_03_T01',
        title_en: 'Islamic Beliefs', title_ur: 'عقائد اسلام',
        subtopics: [
          { subtopic_id: 'LEC-ISL-17_T01_S01', title_en: 'Tawheed (Oneness of Allah)', title_ur: 'توحید' },
          { subtopic_id: 'LEC-ISL-17_T01_S02', title_en: 'Risalat (Prophethood)', title_ur: 'رسالت' },
          { subtopic_id: 'LEC-ISL-17_T01_S03', title_en: 'Khatm-e-Nabuwwat', title_ur: 'ختم نبوت' },
          { subtopic_id: 'LEC-ISL-17_T01_S04', title_en: 'Akhirat (Afterlife)', title_ur: 'آخرت' },
          { subtopic_id: 'LEC-ISL-17_T01_S05', title_en: 'Taqdeer (Divine Decree)', title_ur: 'تقدیر' }
        ]
      },
      {
        topic_id: 'LEC-ISL-17_T02', post_topic_id: 'POST_03_T02',
        title_en: 'Holy Quran', title_ur: 'قرآن مجید',
        subtopics: [
          { subtopic_id: 'LEC-ISL-17_T02_S01', title_en: 'Revelation of Quran', title_ur: 'نزول قرآن' },
          { subtopic_id: 'LEC-ISL-17_T02_S02', title_en: 'Types of Revelation', title_ur: 'وحی کی اقسام' },
          { subtopic_id: 'LEC-ISL-17_T02_S03', title_en: 'Compilation of Quran', title_ur: 'جمع قرآن' },
          { subtopic_id: 'LEC-ISL-17_T02_S04', title_en: 'Makki and Madani Surahs', title_ur: 'مکی مدنی سورتیں' },
          { subtopic_id: 'LEC-ISL-17_T02_S05', title_en: 'Sciences of Quran', title_ur: 'علوم القرآن' },
          { subtopic_id: 'LEC-ISL-17_T02_S06', title_en: 'Principles of Tafseer', title_ur: 'تفسیر کے اصول' }
        ]
      },
      {
        topic_id: 'LEC-ISL-17_T03', post_topic_id: 'POST_03_T03',
        title_en: 'Hadith', title_ur: 'احادیث نبوی',
        subtopics: [
          { subtopic_id: 'LEC-ISL-17_T03_S01', title_en: 'Types of Hadith', title_ur: 'حدیث کی اقسام' },
          { subtopic_id: 'LEC-ISL-17_T03_S02', title_en: 'Sahih Hadith', title_ur: 'صحیح حدیث' },
          { subtopic_id: 'LEC-ISL-17_T03_S03', title_en: "Da'eef Hadith", title_ur: 'ضعیف حدیث' },
          { subtopic_id: 'LEC-ISL-17_T03_S04', title_en: 'Ilm-ur-Rijal', title_ur: 'علم اسماء الرجال' },
          { subtopic_id: 'LEC-ISL-17_T03_S05', title_en: 'Famous Muhaddithin', title_ur: 'مشہور محدثین' },
          { subtopic_id: 'LEC-ISL-17_T03_S06', title_en: 'Books of Hadith', title_ur: 'کتب حدیث' }
        ]
      },
      {
        topic_id: 'LEC-ISL-17_T04', post_topic_id: 'POST_03_T04',
        title_en: 'Seerah of Prophet (PBUH)', title_ur: 'سیرت النبی ﷺ',
        subtopics: [
          { subtopic_id: 'LEC-ISL-17_T04_S01', title_en: 'Birth and Lineage', title_ur: 'ولادت' },
          { subtopic_id: 'LEC-ISL-17_T04_S02', title_en: 'Prophethood', title_ur: 'بعثت' },
          { subtopic_id: 'LEC-ISL-17_T04_S03', title_en: 'Makkan Period', title_ur: 'مکی دور' },
          { subtopic_id: 'LEC-ISL-17_T04_S04', title_en: 'Migration to Madinah', title_ur: 'ہجرت' },
          { subtopic_id: 'LEC-ISL-17_T04_S05', title_en: 'Battles (Ghazwat)', title_ur: 'غزوات' },
          { subtopic_id: 'LEC-ISL-17_T04_S06', title_en: 'Treaty of Hudaibiyah', title_ur: 'صلح حدیبیہ' },
          { subtopic_id: 'LEC-ISL-17_T04_S07', title_en: 'Conquest of Makkah', title_ur: 'فتح مکہ' },
          { subtopic_id: 'LEC-ISL-17_T04_S08', title_en: 'Hajjat-ul-Wida', title_ur: 'حجۃ الوداع' }
        ]
      },
      {
        topic_id: 'LEC-ISL-17_T05', post_topic_id: 'POST_03_T05',
        title_en: 'Islamic Jurisprudence (Fiqh)', title_ur: 'فقہ اسلامی',
        subtopics: [
          { subtopic_id: 'LEC-ISL-17_T05_S01', title_en: 'Quran (Source)', title_ur: 'قرآن' },
          { subtopic_id: 'LEC-ISL-17_T05_S02', title_en: 'Hadith (Source)', title_ur: 'حدیث' },
          { subtopic_id: 'LEC-ISL-17_T05_S03', title_en: 'Ijma', title_ur: 'اجماع' },
          { subtopic_id: 'LEC-ISL-17_T05_S04', title_en: 'Qiyas', title_ur: 'قیاس' },
          { subtopic_id: 'LEC-ISL-17_T05_S05', title_en: 'Four Imams of Fiqh', title_ur: 'چار ائمہ فقہ' },
          { subtopic_id: 'LEC-ISL-17_T05_S06', title_en: 'Codification of Islamic Law', title_ur: 'اسلامی قانون کی تدوین' }
        ]
      },
      {
        topic_id: 'LEC-ISL-17_T06', post_topic_id: 'POST_03_T06',
        title_en: 'Islamic Worship', title_ur: 'اسلامی عبادات',
        subtopics: [
          { subtopic_id: 'LEC-ISL-17_T06_S01', title_en: 'Salah (Prayer)', title_ur: 'نماز' },
          { subtopic_id: 'LEC-ISL-17_T06_S02', title_en: 'Sawm (Fasting)', title_ur: 'روزہ' },
          { subtopic_id: 'LEC-ISL-17_T06_S03', title_en: 'Zakat', title_ur: 'زکوٰۃ' },
          { subtopic_id: 'LEC-ISL-17_T06_S04', title_en: 'Hajj (Pilgrimage)', title_ur: 'حج' },
          { subtopic_id: 'LEC-ISL-17_T06_S05', title_en: 'Conditions and Pillars', title_ur: 'شرائط و ارکان' }
        ]
      },
      {
        topic_id: 'LEC-ISL-17_T07', post_topic_id: 'POST_03_T07',
        title_en: 'Islamic History', title_ur: 'اسلامی تاریخ',
        subtopics: [
          { subtopic_id: 'LEC-ISL-17_T07_S01', title_en: 'Khilafat-e-Rashida', title_ur: 'خلافت راشدہ' },
          { subtopic_id: 'LEC-ISL-17_T07_S02', title_en: 'Banu Umayyah', title_ur: 'بنو امیہ' },
          { subtopic_id: 'LEC-ISL-17_T07_S03', title_en: 'Banu Abbas', title_ur: 'بنو عباس' },
          { subtopic_id: 'LEC-ISL-17_T07_S04', title_en: 'Al-Andalus', title_ur: 'اندلس' },
          { subtopic_id: 'LEC-ISL-17_T07_S05', title_en: 'Ottoman Empire', title_ur: 'سلطنت عثمانیہ' }
        ]
      },
      {
        topic_id: 'LEC-ISL-17_T08', post_topic_id: 'POST_03_T08',
        title_en: 'Islam and Modern World', title_ur: 'اسلام اور جدید دنیا',
        subtopics: [
          { subtopic_id: 'LEC-ISL-17_T08_S01', title_en: 'Islam and Democracy', title_ur: 'اسلام اور جمہوریت' },
          { subtopic_id: 'LEC-ISL-17_T08_S02', title_en: 'Human Rights', title_ur: 'انسانی حقوق' },
          { subtopic_id: 'LEC-ISL-17_T08_S03', title_en: 'Science', title_ur: 'سائنس' },
          { subtopic_id: 'LEC-ISL-17_T08_S04', title_en: 'Islamic Economy', title_ur: 'اسلامی معیشت' },
          { subtopic_id: 'LEC-ISL-17_T08_S05', title_en: 'Islamic Banking', title_ur: 'اسلامی بینکاری' }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────────────
  // POST 04 — Lecturer Pakistan Studies (BS-17)
  // ─────────────────────────────────────────────────────────────────────
  'LEC-PS-17': {
    post_id: 'LEC-PS-17',
    title_en: 'Lecturer Pakistan Studies',
    title_ur: 'لیکچرر پاکستان اسٹڈیز',
    grade: 'BS-17',
    language: 'en',
    exam_weight_note: { top_3_topics: ['LEC-PS-17_T03', 'LEC-PS-17_T04', 'LEC-PS-17_T01'] },
    topics: [
      {
        topic_id: 'LEC-PS-17_T01', post_topic_id: 'POST_04_T01',
        title_en: 'Ideology of Pakistan', title_ur: 'نظریہ پاکستان',
        subtopics: [
          { subtopic_id: 'LEC-PS-17_T01_S01', title_en: 'Two Nation Theory', title_ur: 'دو قومی نظریہ' },
          { subtopic_id: 'LEC-PS-17_T01_S02', title_en: 'Muslim Nationalism', title_ur: 'مسلم قوم پرستی' },
          { subtopic_id: 'LEC-PS-17_T01_S03', title_en: "Allama Iqbal's Vision", title_ur: 'علامہ اقبال کا ویژن' },
          { subtopic_id: 'LEC-PS-17_T01_S04', title_en: "Quaid's Ideology", title_ur: 'قائد کا نظریہ' }
        ]
      },
      {
        topic_id: 'LEC-PS-17_T02', post_topic_id: 'POST_04_T02',
        title_en: 'Muslim Rule in Subcontinent', title_ur: 'برصغیر میں مسلم دور',
        subtopics: [
          { subtopic_id: 'LEC-PS-17_T02_S01', title_en: 'Muhammad Bin Qasim', title_ur: 'محمد بن قاسم' },
          { subtopic_id: 'LEC-PS-17_T02_S02', title_en: 'Delhi Sultanate', title_ur: 'دہلی سلطنت' },
          { subtopic_id: 'LEC-PS-17_T02_S03', title_en: 'Mughal Empire', title_ur: 'مغل سلطنت' },
          { subtopic_id: 'LEC-PS-17_T02_S04', title_en: 'Administrative Systems', title_ur: 'انتظامی نظام' },
          { subtopic_id: 'LEC-PS-17_T02_S05', title_en: 'Cultural Contributions', title_ur: 'ثقافتی شراکت' },
          { subtopic_id: 'LEC-PS-17_T02_S06', title_en: 'Causes of Decline', title_ur: 'زوال کی وجوہات' }
        ]
      },
      {
        topic_id: 'LEC-PS-17_T03', post_topic_id: 'POST_04_T03',
        title_en: 'Pakistan Movement', title_ur: 'تحریک پاکستان',
        subtopics: [
          { subtopic_id: 'LEC-PS-17_T03_S01', title_en: '1857 War of Independence', title_ur: '1857 کی جنگ آزادی' },
          { subtopic_id: 'LEC-PS-17_T03_S02', title_en: 'Congress Formation', title_ur: 'کانگریس کی تشکیل' },
          { subtopic_id: 'LEC-PS-17_T03_S03', title_en: 'Muslim League', title_ur: 'مسلم لیگ' },
          { subtopic_id: 'LEC-PS-17_T03_S04', title_en: 'Lahore Resolution 1940', title_ur: 'قرارداد پاکستان 1940' },
          { subtopic_id: 'LEC-PS-17_T03_S05', title_en: 'Partition 1947', title_ur: 'تقسیم 1947' },
          { subtopic_id: 'LEC-PS-17_T03_S06', title_en: 'Key Events Timeline', title_ur: 'اہم واقعات کا ٹائم لائن' }
        ]
      },
      {
        topic_id: 'LEC-PS-17_T04', post_topic_id: 'POST_04_T04',
        title_en: 'Role of Important Personalities', title_ur: 'اہم شخصیات کا کردار',
        subtopics: [
          { subtopic_id: 'LEC-PS-17_T04_S01', title_en: 'Sir Syed Ahmad Khan', title_ur: 'سرسید احمد خان' },
          { subtopic_id: 'LEC-PS-17_T04_S02', title_en: 'Allama Iqbal', title_ur: 'علامہ اقبال' },
          { subtopic_id: 'LEC-PS-17_T04_S03', title_en: 'Quaid-e-Azam', title_ur: 'قائداعظم' },
          { subtopic_id: 'LEC-PS-17_T04_S04', title_en: 'Liaquat Ali Khan', title_ur: 'لیاقت علی خان' },
          { subtopic_id: 'LEC-PS-17_T04_S05', title_en: 'Fatima Jinnah', title_ur: 'فاطمہ جناح' }
        ]
      },
      {
        topic_id: 'LEC-PS-17_T05', post_topic_id: 'POST_04_T05',
        title_en: 'Constitutional Development', title_ur: 'آئینی نشوونما',
        subtopics: [
          { subtopic_id: 'LEC-PS-17_T05_S01', title_en: 'Objectives Resolution 1949', title_ur: 'قرارداد مقاصد 1949' },
          { subtopic_id: 'LEC-PS-17_T05_S02', title_en: 'Constitution of 1956', title_ur: 'آئین 1956' },
          { subtopic_id: 'LEC-PS-17_T05_S03', title_en: 'Constitution of 1962', title_ur: 'آئین 1962' },
          { subtopic_id: 'LEC-PS-17_T05_S04', title_en: 'Constitution of 1973', title_ur: 'آئین 1973' },
          { subtopic_id: 'LEC-PS-17_T05_S05', title_en: 'Major Amendments', title_ur: 'اہم ترمیمات' }
        ]
      },
      {
        topic_id: 'LEC-PS-17_T06', post_topic_id: 'POST_04_T06',
        title_en: 'Geography of Pakistan', title_ur: 'جغرافیہ پاکستان',
        subtopics: [
          { subtopic_id: 'LEC-PS-17_T06_S01', title_en: 'Location', title_ur: 'مقام' },
          { subtopic_id: 'LEC-PS-17_T06_S02', title_en: 'Physical Features', title_ur: 'قدرتی خصوصیات' },
          { subtopic_id: 'LEC-PS-17_T06_S03', title_en: 'Rivers', title_ur: 'دریا' },
          { subtopic_id: 'LEC-PS-17_T06_S04', title_en: 'Mountains', title_ur: 'پہاڑ' },
          { subtopic_id: 'LEC-PS-17_T06_S05', title_en: 'Climate Zones', title_ur: 'موسمی علاقے' },
          { subtopic_id: 'LEC-PS-17_T06_S06', title_en: 'Natural Vegetation', title_ur: 'قدرتی نباتات' }
        ]
      },
      {
        topic_id: 'LEC-PS-17_T07', post_topic_id: 'POST_04_T07',
        title_en: 'Kashmir Issue', title_ur: 'مسئلہ کشمیر',
        subtopics: [
          { subtopic_id: 'LEC-PS-17_T07_S01', title_en: 'Historical Background', title_ur: 'تاریخی پس منظر' },
          { subtopic_id: 'LEC-PS-17_T07_S02', title_en: 'Partition and Kashmir', title_ur: 'تقسیم اور کشمیر' },
          { subtopic_id: 'LEC-PS-17_T07_S03', title_en: 'UN Resolutions', title_ur: 'اقوام متحدہ کی قراردادیں' },
          { subtopic_id: 'LEC-PS-17_T07_S04', title_en: 'India-Pakistan Wars', title_ur: 'پاک بھارت جنگیں' },
          { subtopic_id: 'LEC-PS-17_T07_S05', title_en: 'Recent Developments', title_ur: 'حالیہ پیش رفت' }
        ]
      },
      {
        topic_id: 'LEC-PS-17_T08', post_topic_id: 'POST_04_T08',
        title_en: 'Economy of Pakistan', title_ur: 'پاکستان کی معیشت',
        subtopics: [
          { subtopic_id: 'LEC-PS-17_T08_S01', title_en: 'Agriculture', title_ur: 'زراعت' },
          { subtopic_id: 'LEC-PS-17_T08_S02', title_en: 'Industry', title_ur: 'صنعت' },
          { subtopic_id: 'LEC-PS-17_T08_S03', title_en: 'Services Sector', title_ur: 'خدمات کا شعبہ' },
          { subtopic_id: 'LEC-PS-17_T08_S04', title_en: 'Major Economic Challenges', title_ur: 'بڑے اقتصادی چیلنجز' },
          { subtopic_id: 'LEC-PS-17_T08_S05', title_en: 'Planning', title_ur: 'منصوبہ بندی' },
          { subtopic_id: 'LEC-PS-17_T08_S06', title_en: 'AJK Economy', title_ur: 'آزاد کشمیر کی معیشت' }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────────────
  // POST 05 — Lecturer Arabic (BS-17)
  // ─────────────────────────────────────────────────────────────────────
  'LEC-ARB-17': {
    post_id: 'LEC-ARB-17',
    title_en: 'Lecturer Arabic',
    title_ur: 'لیکچرر عربی',
    grade: 'BS-17',
    language: 'en',
    exam_weight_note: { top_3_topics: ['LEC-ARB-17_T02', 'LEC-ARB-17_T01', 'LEC-ARB-17_T04'] },
    topics: [
      {
        topic_id: 'LEC-ARB-17_T01', post_topic_id: 'POST_05_T01',
        title_en: 'Arabic Grammar — Sarf (Morphology)', title_ur: 'عربی صرف',
        subtopics: [
          { subtopic_id: 'LEC-ARB-17_T01_S01', title_en: 'Verb Forms', title_ur: 'فعل کی اقسام' },
          { subtopic_id: 'LEC-ARB-17_T01_S02', title_en: 'Noun Patterns', title_ur: 'اسم کے نمونے' },
          { subtopic_id: 'LEC-ARB-17_T01_S03', title_en: 'Adjectives', title_ur: 'صفت' },
          { subtopic_id: 'LEC-ARB-17_T01_S04', title_en: 'Pronouns', title_ur: 'ضمیر' },
          { subtopic_id: 'LEC-ARB-17_T01_S05', title_en: 'Plural Forms', title_ur: 'جمع کی اقسام' },
          { subtopic_id: 'LEC-ARB-17_T01_S06', title_en: 'Masculine / Feminine', title_ur: 'مذکر / مؤنث' },
          { subtopic_id: 'LEC-ARB-17_T01_S07', title_en: 'Particles', title_ur: 'حروف' }
        ]
      },
      {
        topic_id: 'LEC-ARB-17_T02', post_topic_id: 'POST_05_T02',
        title_en: 'Arabic Grammar — Nahw (Syntax)', title_ur: 'عربی نحو',
        subtopics: [
          { subtopic_id: 'LEC-ARB-17_T02_S01', title_en: 'Nominal Sentence', title_ur: 'جملہ اسمیہ' },
          { subtopic_id: 'LEC-ARB-17_T02_S02', title_en: 'Verbal Sentence', title_ur: 'جملہ فعلیہ' },
          { subtopic_id: 'LEC-ARB-17_T02_S03', title_en: 'Case Endings (Iraab)', title_ur: 'اعراب' },
          { subtopic_id: 'LEC-ARB-17_T02_S04', title_en: 'Agreement Rules', title_ur: 'مطابقت کے اصول' },
          { subtopic_id: 'LEC-ARB-17_T02_S05', title_en: 'Dual Forms', title_ur: 'تثنیہ' },
          { subtopic_id: 'LEC-ARB-17_T02_S06', title_en: 'Sentence Structure', title_ur: 'جملے کی ساخت' }
        ]
      },
      {
        topic_id: 'LEC-ARB-17_T03', post_topic_id: 'POST_05_T03',
        title_en: 'Classical Arabic Literature', title_ur: 'کلاسیکی عربی ادب',
        subtopics: [
          { subtopic_id: 'LEC-ARB-17_T03_S01', title_en: 'Pre-Islamic Poetry', title_ur: 'قبل اسلام شاعری' },
          { subtopic_id: 'LEC-ARB-17_T03_S02', title_en: 'Islamic Period Poetry', title_ur: 'اسلامی دور کی شاعری' },
          { subtopic_id: 'LEC-ARB-17_T03_S03', title_en: 'Abbasid Prose', title_ur: 'عباسی نثر' },
          { subtopic_id: 'LEC-ARB-17_T03_S04', title_en: 'Famous Poets and Authors', title_ur: 'مشہور شعراء و ادباء' }
        ]
      },
      {
        topic_id: 'LEC-ARB-17_T04', post_topic_id: 'POST_05_T04',
        title_en: 'Quranic Arabic', title_ur: 'قرآنی عربی',
        subtopics: [
          { subtopic_id: 'LEC-ARB-17_T04_S01', title_en: 'Stylistic Features', title_ur: 'اسلوبی خصوصیات' },
          { subtopic_id: 'LEC-ARB-17_T04_S02', title_en: 'Rhetorical Devices', title_ur: 'بلاغی آلات' },
          { subtopic_id: 'LEC-ARB-17_T04_S03', title_en: 'Quranic Vocabulary', title_ur: 'قرآنی ذخیرہ الفاظ' },
          { subtopic_id: 'LEC-ARB-17_T04_S04', title_en: 'Grammar in Quran', title_ur: 'قرآن میں گرامر' }
        ]
      },
      {
        topic_id: 'LEC-ARB-17_T05', post_topic_id: 'POST_05_T05',
        title_en: 'Arabic Poetry Forms', title_ur: 'عربی شعری اصناف',
        subtopics: [
          { subtopic_id: 'LEC-ARB-17_T05_S01', title_en: 'Qasida', title_ur: 'قصیدہ' },
          { subtopic_id: 'LEC-ARB-17_T05_S02', title_en: 'Ode', title_ur: 'اوڈ' },
          { subtopic_id: 'LEC-ARB-17_T05_S03', title_en: "Ruba'i", title_ur: 'رباعی' },
          { subtopic_id: 'LEC-ARB-17_T05_S04', title_en: 'Elegy', title_ur: 'مرثیہ' },
          { subtopic_id: 'LEC-ARB-17_T05_S05', title_en: "Mu'allaqat", title_ur: 'معلقات' },
          { subtopic_id: 'LEC-ARB-17_T05_S06', title_en: 'Famous Poets', title_ur: 'مشہور شاعر' }
        ]
      },
      {
        topic_id: 'LEC-ARB-17_T06', post_topic_id: 'POST_05_T06',
        title_en: 'Translation', title_ur: 'ترجمہ',
        subtopics: [
          { subtopic_id: 'LEC-ARB-17_T06_S01', title_en: 'Arabic to Urdu', title_ur: 'عربی سے اردو' },
          { subtopic_id: 'LEC-ARB-17_T06_S02', title_en: 'Arabic to English', title_ur: 'عربی سے انگریزی' },
          { subtopic_id: 'LEC-ARB-17_T06_S03', title_en: 'Translation Techniques', title_ur: 'ترجمے کی تکنیک' },
          { subtopic_id: 'LEC-ARB-17_T06_S04', title_en: 'Accuracy and Equivalence', title_ur: 'درستگی اور مساوات' }
        ]
      },
      {
        topic_id: 'LEC-ARB-17_T07', post_topic_id: 'POST_05_T07',
        title_en: 'Teaching Methodology', title_ur: 'تدریسی طریقہ کار',
        subtopics: [
          { subtopic_id: 'LEC-ARB-17_T07_S01', title_en: 'Grammar Translation Method', title_ur: 'گرامر ترجمہ کا طریقہ' },
          { subtopic_id: 'LEC-ARB-17_T07_S02', title_en: 'Communicative Method', title_ur: 'مواصلاتی طریقہ' },
          { subtopic_id: 'LEC-ARB-17_T07_S03', title_en: 'Task-Based Learning', title_ur: 'کام پر مبنی سیکھنا' },
          { subtopic_id: 'LEC-ARB-17_T07_S04', title_en: 'Assessment Strategies', title_ur: 'تشخیصی حکمت عملی' }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────────────
  // POST 06 — Lecturer Persian (BS-17)
  // ─────────────────────────────────────────────────────────────────────
  'LEC-PRS-17': {
    post_id: 'LEC-PRS-17',
    title_en: 'Lecturer Persian',
    title_ur: 'لیکچرر فارسی',
    grade: 'BS-17',
    language: 'en',
    exam_weight_note: { top_3_topics: ['LEC-PRS-17_T02', 'LEC-PRS-17_T01', 'LEC-PRS-17_T03'] },
    topics: [
      {
        topic_id: 'LEC-PRS-17_T01', post_topic_id: 'POST_06_T01',
        title_en: 'Persian Grammar', title_ur: 'فارسی گرامر',
        subtopics: [
          { subtopic_id: 'LEC-PRS-17_T01_S01', title_en: 'Nouns', title_ur: 'اسم' },
          { subtopic_id: 'LEC-PRS-17_T01_S02', title_en: 'Pronouns', title_ur: 'ضمیر' },
          { subtopic_id: 'LEC-PRS-17_T01_S03', title_en: 'Verbs', title_ur: 'فعل' },
          { subtopic_id: 'LEC-PRS-17_T01_S04', title_en: 'Adjectives', title_ur: 'صفت' },
          { subtopic_id: 'LEC-PRS-17_T01_S05', title_en: 'Sentence Structure', title_ur: 'جملے کی ساخت' },
          { subtopic_id: 'LEC-PRS-17_T01_S06', title_en: 'Tenses', title_ur: 'زمانے' },
          { subtopic_id: 'LEC-PRS-17_T01_S07', title_en: 'Plural Forms', title_ur: 'جمع کی اقسام' }
        ]
      },
      {
        topic_id: 'LEC-PRS-17_T02', post_topic_id: 'POST_06_T02',
        title_en: 'Classical Persian Literature', title_ur: 'کلاسیکی فارسی ادب',
        subtopics: [
          { subtopic_id: 'LEC-PRS-17_T02_S01', title_en: 'Pre-Islamic Persian', title_ur: 'قبل اسلام فارسی' },
          { subtopic_id: 'LEC-PRS-17_T02_S02', title_en: 'Medieval Period', title_ur: 'قرون وسطی کا دور' },
          { subtopic_id: 'LEC-PRS-17_T02_S03', title_en: 'Rumi', title_ur: 'رومی' },
          { subtopic_id: 'LEC-PRS-17_T02_S04', title_en: 'Saadi', title_ur: 'سعدی' },
          { subtopic_id: 'LEC-PRS-17_T02_S05', title_en: 'Hafez', title_ur: 'حافظ' },
          { subtopic_id: 'LEC-PRS-17_T02_S06', title_en: 'Omar Khayyam', title_ur: 'عمر خیام' },
          { subtopic_id: 'LEC-PRS-17_T02_S07', title_en: 'Major Works', title_ur: 'اہم تصنیفات' }
        ]
      },
      {
        topic_id: 'LEC-PRS-17_T03', post_topic_id: 'POST_06_T03',
        title_en: 'Persian Poetry Forms', title_ur: 'فارسی شعری اصناف',
        subtopics: [
          { subtopic_id: 'LEC-PRS-17_T03_S01', title_en: 'Ghazal', title_ur: 'غزل' },
          { subtopic_id: 'LEC-PRS-17_T03_S02', title_en: 'Qasida', title_ur: 'قصیدہ' },
          { subtopic_id: 'LEC-PRS-17_T03_S03', title_en: 'Masnavi', title_ur: 'مثنوی' },
          { subtopic_id: 'LEC-PRS-17_T03_S04', title_en: 'Rubai', title_ur: 'رباعی' },
          { subtopic_id: 'LEC-PRS-17_T03_S05', title_en: 'Elegy', title_ur: 'مرثیہ' },
          { subtopic_id: 'LEC-PRS-17_T03_S06', title_en: 'Forms and Structure', title_ur: 'اصناف اور ساخت' }
        ]
      },
      {
        topic_id: 'LEC-PRS-17_T04', post_topic_id: 'POST_06_T04',
        title_en: 'Persian Prose', title_ur: 'فارسی نثر',
        subtopics: [
          { subtopic_id: 'LEC-PRS-17_T04_S01', title_en: 'Historical Prose', title_ur: 'تاریخی نثر' },
          { subtopic_id: 'LEC-PRS-17_T04_S02', title_en: 'Scientific Prose', title_ur: 'سائنسی نثر' },
          { subtopic_id: 'LEC-PRS-17_T04_S03', title_en: 'Religious Prose', title_ur: 'مذہبی نثر' },
          { subtopic_id: 'LEC-PRS-17_T04_S04', title_en: 'Famous Prose Writers', title_ur: 'مشہور نثر نگار' }
        ]
      },
      {
        topic_id: 'LEC-PRS-17_T05', post_topic_id: 'POST_06_T05',
        title_en: 'Translation', title_ur: 'ترجمہ',
        subtopics: [
          { subtopic_id: 'LEC-PRS-17_T05_S01', title_en: 'Persian to Urdu', title_ur: 'فارسی سے اردو' },
          { subtopic_id: 'LEC-PRS-17_T05_S02', title_en: 'Persian to English', title_ur: 'فارسی سے انگریزی' },
          { subtopic_id: 'LEC-PRS-17_T05_S03', title_en: 'Techniques and Accuracy', title_ur: 'تکنیک اور درستگی' }
        ]
      },
      {
        topic_id: 'LEC-PRS-17_T06', post_topic_id: 'POST_06_T06',
        title_en: 'Persian Influence on Urdu', title_ur: 'اردو پر فارسی اثرات',
        subtopics: [
          { subtopic_id: 'LEC-PRS-17_T06_S01', title_en: 'Vocabulary Borrowing', title_ur: 'الفاظ کا اقتباس' },
          { subtopic_id: 'LEC-PRS-17_T06_S02', title_en: 'Literary Genres', title_ur: 'ادبی اصناف' },
          { subtopic_id: 'LEC-PRS-17_T06_S03', title_en: 'Cultural Influence', title_ur: 'ثقافتی اثرات' },
          { subtopic_id: 'LEC-PRS-17_T06_S04', title_en: 'Persian in Subcontinent', title_ur: 'برصغیر میں فارسی' }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────────────
  // POST 07 — Lecturer History (BS-17)
  // ─────────────────────────────────────────────────────────────────────
  'LEC-HIS-17': {
    post_id: 'LEC-HIS-17',
    title_en: 'Lecturer History',
    title_ur: 'لیکچرر تاریخ',
    grade: 'BS-17',
    language: 'en',
    exam_weight_note: { top_3_topics: ['LEC-HIS-17_T02', 'LEC-HIS-17_T04', 'LEC-HIS-17_T03'] },
    topics: [
      {
        topic_id: 'LEC-HIS-17_T01', post_topic_id: 'POST_07_T01',
        title_en: 'History of Subcontinent', title_ur: 'برصغیر کی تاریخ',
        subtopics: [
          { subtopic_id: 'LEC-HIS-17_T01_S01', title_en: 'Indus Valley Civilization', title_ur: 'وادی سندھ کی تہذیب' },
          { subtopic_id: 'LEC-HIS-17_T01_S02', title_en: 'Vedic Period', title_ur: 'ویدک دور' },
          { subtopic_id: 'LEC-HIS-17_T01_S03', title_en: 'Mauryan Empire', title_ur: 'موریہ سلطنت' },
          { subtopic_id: 'LEC-HIS-17_T01_S04', title_en: 'Gupta Empire', title_ur: 'گپتا سلطنت' },
          { subtopic_id: 'LEC-HIS-17_T01_S05', title_en: 'Medieval India', title_ur: 'قرون وسطی کا ہند' }
        ]
      },
      {
        topic_id: 'LEC-HIS-17_T02', post_topic_id: 'POST_07_T02',
        title_en: 'Islamic Rule in Subcontinent', title_ur: 'برصغیر میں اسلامی حکومت',
        subtopics: [
          { subtopic_id: 'LEC-HIS-17_T02_S01', title_en: 'Delhi Sultanate Major Sultans', title_ur: 'دہلی سلطنت کے اہم سلاطین' },
          { subtopic_id: 'LEC-HIS-17_T02_S02', title_en: 'Mughal Empire', title_ur: 'مغل سلطنت' },
          { subtopic_id: 'LEC-HIS-17_T02_S03', title_en: 'Administrative System', title_ur: 'انتظامی نظام' },
          { subtopic_id: 'LEC-HIS-17_T02_S04', title_en: 'Economy', title_ur: 'معیشت' },
          { subtopic_id: 'LEC-HIS-17_T02_S05', title_en: 'Culture and Architecture', title_ur: 'ثقافت اور فن تعمیر' },
          { subtopic_id: 'LEC-HIS-17_T02_S06', title_en: 'Decline', title_ur: 'زوال' }
        ]
      },
      {
        topic_id: 'LEC-HIS-17_T03', post_topic_id: 'POST_07_T03',
        title_en: 'British Rule in India', title_ur: 'ہندوستان میں برطانوی دور',
        subtopics: [
          { subtopic_id: 'LEC-HIS-17_T03_S01', title_en: 'East India Company', title_ur: 'ایسٹ انڈیا کمپنی' },
          { subtopic_id: 'LEC-HIS-17_T03_S02', title_en: 'Anglo-Mysore Wars', title_ur: 'اینگلو میسور جنگیں' },
          { subtopic_id: 'LEC-HIS-17_T03_S03', title_en: 'Anglo-Maratha Wars', title_ur: 'اینگلو مراٹھا جنگیں' },
          { subtopic_id: 'LEC-HIS-17_T03_S04', title_en: 'Administrative System', title_ur: 'انتظامی نظام' },
          { subtopic_id: 'LEC-HIS-17_T03_S05', title_en: 'Economic Policies', title_ur: 'اقتصادی پالیسیاں' },
          { subtopic_id: 'LEC-HIS-17_T03_S06', title_en: 'Social Reforms', title_ur: 'سماجی اصلاحات' },
          { subtopic_id: 'LEC-HIS-17_T03_S07', title_en: 'Indian Renaissance', title_ur: 'ہندوستانی نشاۃ ثانیہ' }
        ]
      },
      {
        topic_id: 'LEC-HIS-17_T04', post_topic_id: 'POST_07_T04',
        title_en: 'World History', title_ur: 'عالمی تاریخ',
        subtopics: [
          { subtopic_id: 'LEC-HIS-17_T04_S01', title_en: 'WWI Causes and Effects', title_ur: 'پہلی جنگ عظیم کے اسباب و نتائج' },
          { subtopic_id: 'LEC-HIS-17_T04_S02', title_en: 'WWII Causes and Effects', title_ur: 'دوسری جنگ عظیم کے اسباب و نتائج' },
          { subtopic_id: 'LEC-HIS-17_T04_S03', title_en: 'Industrial Revolution', title_ur: 'صنعتی انقلاب' },
          { subtopic_id: 'LEC-HIS-17_T04_S04', title_en: 'French Revolution', title_ur: 'فرانسیسی انقلاب' },
          { subtopic_id: 'LEC-HIS-17_T04_S05', title_en: 'Cold War', title_ur: 'سرد جنگ' },
          { subtopic_id: 'LEC-HIS-17_T04_S06', title_en: 'UN Formation', title_ur: 'اقوام متحدہ کی تشکیل' },
          { subtopic_id: 'LEC-HIS-17_T04_S07', title_en: 'Decolonization', title_ur: 'نو آبادیاتی آزادی' }
        ]
      },
      {
        topic_id: 'LEC-HIS-17_T05', post_topic_id: 'POST_07_T05',
        title_en: 'Kashmir History', title_ur: 'کشمیر کی تاریخ',
        subtopics: [
          { subtopic_id: 'LEC-HIS-17_T05_S01', title_en: 'Mughal/Afghan Rule', title_ur: 'مغل/افغان دور' },
          { subtopic_id: 'LEC-HIS-17_T05_S02', title_en: 'Sikh Rule', title_ur: 'سکھ دور' },
          { subtopic_id: 'LEC-HIS-17_T05_S03', title_en: 'Dogra Rule', title_ur: 'ڈوگرہ دور' },
          { subtopic_id: 'LEC-HIS-17_T05_S04', title_en: 'Post-1947 Dispute', title_ur: '1947 کے بعد کا تنازعہ' },
          { subtopic_id: 'LEC-HIS-17_T05_S05', title_en: 'UN Resolutions', title_ur: 'اقوام متحدہ کی قراردادیں' },
          { subtopic_id: 'LEC-HIS-17_T05_S06', title_en: 'International Interventions', title_ur: 'بین الاقوامی مداخلت' }
        ]
      },
      {
        topic_id: 'LEC-HIS-17_T06', post_topic_id: 'POST_07_T06',
        title_en: 'Historical Research Methods', title_ur: 'تاریخی تحقیق کے طریقے',
        subtopics: [
          { subtopic_id: 'LEC-HIS-17_T06_S01', title_en: 'Primary Sources', title_ur: 'بنیادی ماخذ' },
          { subtopic_id: 'LEC-HIS-17_T06_S02', title_en: 'Secondary Sources', title_ur: 'ثانوی ماخذ' },
          { subtopic_id: 'LEC-HIS-17_T06_S03', title_en: 'Historical Interpretation', title_ur: 'تاریخی تعبیر' },
          { subtopic_id: 'LEC-HIS-17_T06_S04', title_en: 'Chronology', title_ur: 'تاریخ وار ترتیب' },
          { subtopic_id: 'LEC-HIS-17_T06_S05', title_en: 'Research Methodology', title_ur: 'تحقیق کا طریقہ کار' }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────────────
  // POST 08 — Lecturer Political Science (BS-17)
  // ─────────────────────────────────────────────────────────────────────
  'LEC-POL-17': {
    post_id: 'LEC-POL-17',
    title_en: 'Lecturer Political Science',
    title_ur: 'لیکچرر سیاسیات',
    grade: 'BS-17',
    language: 'en',
    exam_weight_note: { top_3_topics: ['LEC-POL-17_T04', 'LEC-POL-17_T02', 'LEC-POL-17_T05'] },
    topics: [
      {
        topic_id: 'LEC-POL-17_T01', post_topic_id: 'POST_08_T01',
        title_en: 'Introduction to Political Science', title_ur: 'سیاسیات کا تعارف',
        subtopics: [
          { subtopic_id: 'LEC-POL-17_T01_S01', title_en: 'Definition and Scope', title_ur: 'تعریف اور دائرہ کار' },
          { subtopic_id: 'LEC-POL-17_T01_S02', title_en: 'State and Government', title_ur: 'ریاست اور حکومت' },
          { subtopic_id: 'LEC-POL-17_T01_S03', title_en: 'Power and Authority', title_ur: 'طاقت اور اختیار' },
          { subtopic_id: 'LEC-POL-17_T01_S04', title_en: 'Sovereignty', title_ur: 'خودمختاری' },
          { subtopic_id: 'LEC-POL-17_T01_S05', title_en: 'Legitimacy', title_ur: 'جواز' },
          { subtopic_id: 'LEC-POL-17_T01_S06', title_en: 'Law and Order', title_ur: 'امن و قانون' }
        ]
      },
      {
        topic_id: 'LEC-POL-17_T02', post_topic_id: 'POST_08_T02',
        title_en: 'Political Theories', title_ur: 'سیاسی نظریات',
        subtopics: [
          { subtopic_id: 'LEC-POL-17_T02_S01', title_en: 'Plato and Aristotle', title_ur: 'افلاطون اور ارسطو' },
          { subtopic_id: 'LEC-POL-17_T02_S02', title_en: 'Machiavelli', title_ur: 'میکیاویلی' },
          { subtopic_id: 'LEC-POL-17_T02_S03', title_en: 'Liberalism', title_ur: 'لبرل ازم' },
          { subtopic_id: 'LEC-POL-17_T02_S04', title_en: 'Conservatism', title_ur: 'قدامت پسندی' },
          { subtopic_id: 'LEC-POL-17_T02_S05', title_en: 'Socialism', title_ur: 'سوشلزم' },
          { subtopic_id: 'LEC-POL-17_T02_S06', title_en: 'Marxism', title_ur: 'مارکسزم' },
          { subtopic_id: 'LEC-POL-17_T02_S07', title_en: 'Feminism', title_ur: 'فیمینزم' },
          { subtopic_id: 'LEC-POL-17_T02_S08', title_en: 'Postmodernism', title_ur: 'پوسٹ ماڈرن ازم' }
        ]
      },
      {
        topic_id: 'LEC-POL-17_T03', post_topic_id: 'POST_08_T03',
        title_en: 'Constitutional Government', title_ur: 'آئینی حکومت',
        subtopics: [
          { subtopic_id: 'LEC-POL-17_T03_S01', title_en: 'Unitary vs Federal', title_ur: 'وحدانی بمقابلہ وفاقی' },
          { subtopic_id: 'LEC-POL-17_T03_S02', title_en: 'Presidential vs Parliamentary', title_ur: 'صدارتی بمقابلہ پارلیمانی' },
          { subtopic_id: 'LEC-POL-17_T03_S03', title_en: 'Separation of Powers', title_ur: 'اختیارات کی تقسیم' },
          { subtopic_id: 'LEC-POL-17_T03_S04', title_en: 'Checks and Balances', title_ur: 'جانچ اور توازن' },
          { subtopic_id: 'LEC-POL-17_T03_S05', title_en: 'Constitutionalism', title_ur: 'آئین پسندی' }
        ]
      },
      {
        topic_id: 'LEC-POL-17_T04', post_topic_id: 'POST_08_T04',
        title_en: 'Pakistan Political System', title_ur: 'پاکستان کا سیاسی نظام',
        subtopics: [
          { subtopic_id: 'LEC-POL-17_T04_S01', title_en: 'Constitutional History', title_ur: 'آئینی تاریخ' },
          { subtopic_id: 'LEC-POL-17_T04_S02', title_en: 'Political Parties', title_ur: 'سیاسی جماعتیں' },
          { subtopic_id: 'LEC-POL-17_T04_S03', title_en: 'Democracy and Military', title_ur: 'جمہوریت اور فوج' },
          { subtopic_id: 'LEC-POL-17_T04_S04', title_en: 'Civil-Military Relations', title_ur: 'سویلین فوجی تعلقات' },
          { subtopic_id: 'LEC-POL-17_T04_S05', title_en: 'Foreign Policy', title_ur: 'خارجہ پالیسی' }
        ]
      },
      {
        topic_id: 'LEC-POL-17_T05', post_topic_id: 'POST_08_T05',
        title_en: 'International Relations', title_ur: 'بین الاقوامی تعلقات',
        subtopics: [
          { subtopic_id: 'LEC-POL-17_T05_S01', title_en: 'Realism vs Liberalism', title_ur: 'حقیقت پسندی بمقابلہ لبرل ازم' },
          { subtopic_id: 'LEC-POL-17_T05_S02', title_en: 'Power Politics', title_ur: 'طاقت کی سیاست' },
          { subtopic_id: 'LEC-POL-17_T05_S03', title_en: 'Balance of Power', title_ur: 'توازن طاقت' },
          { subtopic_id: 'LEC-POL-17_T05_S04', title_en: 'UN System', title_ur: 'اقوام متحدہ کا نظام' },
          { subtopic_id: 'LEC-POL-17_T05_S05', title_en: 'Major IR Theories', title_ur: 'اہم بین الاقوامی تعلقات نظریات' }
        ]
      },
      {
        topic_id: 'LEC-POL-17_T06', post_topic_id: 'POST_08_T06',
        title_en: 'International Organizations', title_ur: 'بین الاقوامی تنظیمیں',
        subtopics: [
          { subtopic_id: 'LEC-POL-17_T06_S01', title_en: 'United Nations', title_ur: 'اقوام متحدہ' },
          { subtopic_id: 'LEC-POL-17_T06_S02', title_en: 'SAARC', title_ur: 'سارک' },
          { subtopic_id: 'LEC-POL-17_T06_S03', title_en: 'OIC', title_ur: 'او آئی سی' },
          { subtopic_id: 'LEC-POL-17_T06_S04', title_en: 'World Bank', title_ur: 'عالمی بینک' },
          { subtopic_id: 'LEC-POL-17_T06_S05', title_en: 'IMF', title_ur: 'آئی ایم ایف' },
          { subtopic_id: 'LEC-POL-17_T06_S06', title_en: 'WTO', title_ur: 'ڈبلیو ٹی او' }
        ]
      },
      {
        topic_id: 'LEC-POL-17_T07', post_topic_id: 'POST_08_T07',
        title_en: 'Electoral System', title_ur: 'انتخابی نظام',
        subtopics: [
          { subtopic_id: 'LEC-POL-17_T07_S01', title_en: 'Types of Electoral Systems', title_ur: 'انتخابی نظام کی اقسام' },
          { subtopic_id: 'LEC-POL-17_T07_S02', title_en: 'Voting Behavior', title_ur: 'ووٹنگ رویہ' },
          { subtopic_id: 'LEC-POL-17_T07_S03', title_en: 'Political Parties in Pakistan', title_ur: 'پاکستان میں سیاسی جماعتیں' },
          { subtopic_id: 'LEC-POL-17_T07_S04', title_en: 'Election Commission', title_ur: 'الیکشن کمیشن' }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────────────
  // POST 09 — Lecturer Economics (BS-17)
  // ─────────────────────────────────────────────────────────────────────
  'LEC-ECO-17': {
    post_id: 'LEC-ECO-17',
    title_en: 'Lecturer Economics',
    title_ur: 'لیکچرر معاشیات',
    grade: 'BS-17',
    language: 'en',
    exam_weight_note: { top_3_topics: ['LEC-ECO-17_T06', 'LEC-ECO-17_T05', 'LEC-ECO-17_T08'] },
    topics: [
      {
        topic_id: 'LEC-ECO-17_T01', post_topic_id: 'POST_09_T01',
        title_en: 'Theory of Demand', title_ur: 'طلب کا نظریہ',
        subtopics: [
          { subtopic_id: 'LEC-ECO-17_T01_S01', title_en: 'Law of Demand', title_ur: 'قانون طلب' },
          { subtopic_id: 'LEC-ECO-17_T01_S02', title_en: 'Determinants', title_ur: 'تعین کنندہ' },
          { subtopic_id: 'LEC-ECO-17_T01_S03', title_en: 'Demand Curve', title_ur: 'طلب کا منحنی' },
          { subtopic_id: 'LEC-ECO-17_T01_S04', title_en: 'Price Elasticity', title_ur: 'قیمت لچک' },
          { subtopic_id: 'LEC-ECO-17_T01_S05', title_en: 'Income Elasticity', title_ur: 'آمدنی لچک' },
          { subtopic_id: 'LEC-ECO-17_T01_S06', title_en: 'Cross Elasticity', title_ur: 'بین لچک' }
        ]
      },
      {
        topic_id: 'LEC-ECO-17_T02', post_topic_id: 'POST_09_T02',
        title_en: 'Theory of Supply', title_ur: 'رسد کا نظریہ',
        subtopics: [
          { subtopic_id: 'LEC-ECO-17_T02_S01', title_en: 'Law of Supply', title_ur: 'قانون رسد' },
          { subtopic_id: 'LEC-ECO-17_T02_S02', title_en: 'Determinants', title_ur: 'تعین کنندہ' },
          { subtopic_id: 'LEC-ECO-17_T02_S03', title_en: 'Supply Curve', title_ur: 'رسد کا منحنی' },
          { subtopic_id: 'LEC-ECO-17_T02_S04', title_en: 'Price Elasticity of Supply', title_ur: 'رسد کی قیمت لچک' },
          { subtopic_id: 'LEC-ECO-17_T02_S05', title_en: 'Market Equilibrium', title_ur: 'بازار توازن' }
        ]
      },
      {
        topic_id: 'LEC-ECO-17_T03', post_topic_id: 'POST_09_T03',
        title_en: 'Consumer Behavior', title_ur: 'صارف رویہ',
        subtopics: [
          { subtopic_id: 'LEC-ECO-17_T03_S01', title_en: 'Utility Analysis', title_ur: 'افادیت کا تجزیہ' },
          { subtopic_id: 'LEC-ECO-17_T03_S02', title_en: 'Cardinal vs Ordinal Approach', title_ur: 'کارڈنل بمقابلہ آرڈنل نقطہ نظر' },
          { subtopic_id: 'LEC-ECO-17_T03_S03', title_en: 'Indifference Curves', title_ur: 'بے تفاوتی منحنیات' },
          { subtopic_id: 'LEC-ECO-17_T03_S04', title_en: 'Budget Constraints', title_ur: 'بجٹ کی حدود' },
          { subtopic_id: 'LEC-ECO-17_T03_S05', title_en: 'Consumer Equilibrium', title_ur: 'صارف توازن' }
        ]
      },
      {
        topic_id: 'LEC-ECO-17_T04', post_topic_id: 'POST_09_T04',
        title_en: 'Production and Cost', title_ur: 'پیداوار اور لاگت',
        subtopics: [
          { subtopic_id: 'LEC-ECO-17_T04_S01', title_en: 'Production Function', title_ur: 'پیداواری فنکشن' },
          { subtopic_id: 'LEC-ECO-17_T04_S02', title_en: 'Short-run vs Long-run', title_ur: 'قلیل مدتی بمقابلہ طویل مدتی' },
          { subtopic_id: 'LEC-ECO-17_T04_S03', title_en: 'Law of Diminishing Returns', title_ur: 'قانون تناقص منفعت' },
          { subtopic_id: 'LEC-ECO-17_T04_S04', title_en: 'Fixed/Variable/Total/Marginal Costs', title_ur: 'مقررہ/متغیر/کل/حاشیائی لاگت' },
          { subtopic_id: 'LEC-ECO-17_T04_S05', title_en: 'Economies of Scale', title_ur: 'پیمانے کی معیشتیں' }
        ]
      },
      {
        topic_id: 'LEC-ECO-17_T05', post_topic_id: 'POST_09_T05',
        title_en: 'Market Structures', title_ur: 'بازار کی ساخت',
        subtopics: [
          { subtopic_id: 'LEC-ECO-17_T05_S01', title_en: 'Perfect Competition', title_ur: 'مکمل مسابقت' },
          { subtopic_id: 'LEC-ECO-17_T05_S02', title_en: 'Monopoly', title_ur: 'اجارہ داری' },
          { subtopic_id: 'LEC-ECO-17_T05_S03', title_en: 'Monopolistic Competition', title_ur: 'اجارہ دارانہ مسابقت' },
          { subtopic_id: 'LEC-ECO-17_T05_S04', title_en: 'Oligopoly', title_ur: 'قلیل اجارہ داری' },
          { subtopic_id: 'LEC-ECO-17_T05_S05', title_en: 'Price Determination', title_ur: 'قیمت کا تعین' }
        ]
      },
      {
        topic_id: 'LEC-ECO-17_T06', post_topic_id: 'POST_09_T06',
        title_en: 'Macroeconomics', title_ur: 'کلی معاشیات',
        subtopics: [
          { subtopic_id: 'LEC-ECO-17_T06_S01', title_en: 'GDP / GNP / NNP', title_ur: 'جی ڈی پی / جی این پی / این این پی' },
          { subtopic_id: 'LEC-ECO-17_T06_S02', title_en: 'National Income Methods', title_ur: 'قومی آمدنی کے طریقے' },
          { subtopic_id: 'LEC-ECO-17_T06_S03', title_en: 'Inflation Types', title_ur: 'افراط زر کی اقسام' },
          { subtopic_id: 'LEC-ECO-17_T06_S04', title_en: 'Unemployment Types', title_ur: 'بے روزگاری کی اقسام' },
          { subtopic_id: 'LEC-ECO-17_T06_S05', title_en: 'Business Cycles', title_ur: 'کاروباری چکر' },
          { subtopic_id: 'LEC-ECO-17_T06_S06', title_en: 'Fiscal Policy', title_ur: 'مالیاتی پالیسی' },
          { subtopic_id: 'LEC-ECO-17_T06_S07', title_en: 'Monetary Policy', title_ur: 'زری پالیسی' }
        ]
      },
      {
        topic_id: 'LEC-ECO-17_T07', post_topic_id: 'POST_09_T07',
        title_en: 'International Economics', title_ur: 'بین الاقوامی معاشیات',
        subtopics: [
          { subtopic_id: 'LEC-ECO-17_T07_S01', title_en: 'Balance of Payments', title_ur: 'ادائیگیوں کا توازن' },
          { subtopic_id: 'LEC-ECO-17_T07_S02', title_en: 'Exchange Rates', title_ur: 'تبادلہ شرحیں' },
          { subtopic_id: 'LEC-ECO-17_T07_S03', title_en: 'Comparative Advantage', title_ur: 'تقابلی فائدہ' },
          { subtopic_id: 'LEC-ECO-17_T07_S04', title_en: 'Protectionism vs Free Trade', title_ur: 'تحفظ پسندی بمقابلہ آزاد تجارت' },
          { subtopic_id: 'LEC-ECO-17_T07_S05', title_en: 'IMF / World Bank / WTO', title_ur: 'آئی ایم ایف / عالمی بینک / ڈبلیو ٹی او' }
        ]
      },
      {
        topic_id: 'LEC-ECO-17_T08', post_topic_id: 'POST_09_T08',
        title_en: 'Development Economics', title_ur: 'ترقیاتی معاشیات',
        subtopics: [
          { subtopic_id: 'LEC-ECO-17_T08_S01', title_en: 'Growth vs Development', title_ur: 'نمو بمقابلہ ترقی' },
          { subtopic_id: 'LEC-ECO-17_T08_S02', title_en: 'Poverty and Inequality', title_ur: 'غربت اور عدم مساوات' },
          { subtopic_id: 'LEC-ECO-17_T08_S03', title_en: 'HDI', title_ur: 'انسانی ترقی کا اشاریہ' },
          { subtopic_id: 'LEC-ECO-17_T08_S04', title_en: 'Population Issues', title_ur: 'آبادی کے مسائل' },
          { subtopic_id: 'LEC-ECO-17_T08_S05', title_en: 'Sustainable Development', title_ur: 'پائیدار ترقی' },
          { subtopic_id: 'LEC-ECO-17_T08_S06', title_en: 'Pakistan Economy', title_ur: 'پاکستانی معیشت' }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────────────
  // POST 10 — Lecturer Education (BS-17)
  // ─────────────────────────────────────────────────────────────────────
  'LEC-EDU-17': {
    post_id: 'LEC-EDU-17',
    title_en: 'Lecturer Education',
    title_ur: 'لیکچرر تعلیم',
    grade: 'BS-17',
    language: 'en',
    exam_weight_note: { top_3_topics: ['LEC-EDU-17_T02', 'LEC-EDU-17_T04', 'LEC-EDU-17_T05'] },
    topics: [
      {
        topic_id: 'LEC-EDU-17_T01', post_topic_id: 'POST_10_T01',
        title_en: 'Educational Philosophies', title_ur: 'تعلیمی فلسفے',
        subtopics: [
          { subtopic_id: 'LEC-EDU-17_T01_S01', title_en: 'Idealism', title_ur: 'مثالیت پسندی' },
          { subtopic_id: 'LEC-EDU-17_T01_S02', title_en: 'Realism', title_ur: 'حقیقت پسندی' },
          { subtopic_id: 'LEC-EDU-17_T01_S03', title_en: 'Pragmatism', title_ur: 'عملیت پسندی' },
          { subtopic_id: 'LEC-EDU-17_T01_S04', title_en: 'Existentialism', title_ur: 'وجودیت' },
          { subtopic_id: 'LEC-EDU-17_T01_S05', title_en: 'Perennialism', title_ur: 'دائمیت' },
          { subtopic_id: 'LEC-EDU-17_T01_S06', title_en: 'Progressivism', title_ur: 'ترقی پسندی' },
          { subtopic_id: 'LEC-EDU-17_T01_S07', title_en: 'Constructivism', title_ur: 'تعمیریت' }
        ]
      },
      {
        topic_id: 'LEC-EDU-17_T02', post_topic_id: 'POST_10_T02',
        title_en: 'Educational Psychology', title_ur: 'تعلیمی نفسیات',
        subtopics: [
          { subtopic_id: 'LEC-EDU-17_T02_S01', title_en: 'Behaviorism', title_ur: 'رویہ ازم' },
          { subtopic_id: 'LEC-EDU-17_T02_S02', title_en: 'Cognitivism', title_ur: 'علمیت پسندی' },
          { subtopic_id: 'LEC-EDU-17_T02_S03', title_en: 'Constructivism', title_ur: 'تعمیریت' },
          { subtopic_id: 'LEC-EDU-17_T02_S04', title_en: "Piaget's Stages", title_ur: 'پیاژے کے مراحل' },
          { subtopic_id: 'LEC-EDU-17_T02_S05', title_en: 'Vygotsky ZPD', title_ur: 'ویگوٹسکی ZPD' },
          { subtopic_id: 'LEC-EDU-17_T02_S06', title_en: 'Erikson', title_ur: 'ایرکسن' },
          { subtopic_id: 'LEC-EDU-17_T02_S07', title_en: 'Motivation Theories', title_ur: 'ترغیب کے نظریات' },
          { subtopic_id: 'LEC-EDU-17_T02_S08', title_en: 'Multiple Intelligences', title_ur: 'متعدد ذہانتیں' }
        ]
      },
      {
        topic_id: 'LEC-EDU-17_T03', post_topic_id: 'POST_10_T03',
        title_en: 'Teaching Methods', title_ur: 'تدریسی طریقے',
        subtopics: [
          { subtopic_id: 'LEC-EDU-17_T03_S01', title_en: 'Lecture Method', title_ur: 'لیکچر طریقہ' },
          { subtopic_id: 'LEC-EDU-17_T03_S02', title_en: 'Demonstration', title_ur: 'مظاہرہ' },
          { subtopic_id: 'LEC-EDU-17_T03_S03', title_en: 'Problem-solving', title_ur: 'مسئلہ حل کرنا' },
          { subtopic_id: 'LEC-EDU-17_T03_S04', title_en: 'Project Method', title_ur: 'منصوبہ طریقہ' },
          { subtopic_id: 'LEC-EDU-17_T03_S05', title_en: 'Discovery Learning', title_ur: 'دریافتی سیکھنا' },
          { subtopic_id: 'LEC-EDU-17_T03_S06', title_en: 'Collaborative Learning', title_ur: 'مشترکہ سیکھنا' },
          { subtopic_id: 'LEC-EDU-17_T03_S07', title_en: 'Differentiated Instruction', title_ur: 'متفرق تدریس' }
        ]
      },
      {
        topic_id: 'LEC-EDU-17_T04', post_topic_id: 'POST_10_T04',
        title_en: 'Curriculum Development', title_ur: 'نصاب کی تشکیل',
        subtopics: [
          { subtopic_id: 'LEC-EDU-17_T04_S01', title_en: 'Types of Curriculum', title_ur: 'نصاب کی اقسام' },
          { subtopic_id: 'LEC-EDU-17_T04_S02', title_en: 'Curriculum Design Principles', title_ur: 'نصاب ڈیزائن کے اصول' },
          { subtopic_id: 'LEC-EDU-17_T04_S03', title_en: "Bloom's Taxonomy", title_ur: 'بلوم کی درجہ بندی' },
          { subtopic_id: 'LEC-EDU-17_T04_S04', title_en: 'Curriculum Evaluation', title_ur: 'نصاب کا جائزہ' },
          { subtopic_id: 'LEC-EDU-17_T04_S05', title_en: 'Instructional Objectives', title_ur: 'تدریسی مقاصد' }
        ]
      },
      {
        topic_id: 'LEC-EDU-17_T05', post_topic_id: 'POST_10_T05',
        title_en: 'Educational Evaluation', title_ur: 'تعلیمی تشخیص',
        subtopics: [
          { subtopic_id: 'LEC-EDU-17_T05_S01', title_en: 'Formative Assessment', title_ur: 'تشکیلی تشخیص' },
          { subtopic_id: 'LEC-EDU-17_T05_S02', title_en: 'Summative Assessment', title_ur: 'اختتامی تشخیص' },
          { subtopic_id: 'LEC-EDU-17_T05_S03', title_en: 'Diagnostic Assessment', title_ur: 'تشخیصی تشخیص' },
          { subtopic_id: 'LEC-EDU-17_T05_S04', title_en: 'MCQ Construction', title_ur: 'MCQ کی تعمیر' },
          { subtopic_id: 'LEC-EDU-17_T05_S05', title_en: 'Essay Tests', title_ur: 'مضمون امتحانات' },
          { subtopic_id: 'LEC-EDU-17_T05_S06', title_en: 'Reliability and Validity', title_ur: 'قابل اعتماد اور درستی' }
        ]
      },
      {
        topic_id: 'LEC-EDU-17_T06', post_topic_id: 'POST_10_T06',
        title_en: 'Educational Research', title_ur: 'تعلیمی تحقیق',
        subtopics: [
          { subtopic_id: 'LEC-EDU-17_T06_S01', title_en: 'Qualitative Research', title_ur: 'نوعی تحقیق' },
          { subtopic_id: 'LEC-EDU-17_T06_S02', title_en: 'Quantitative Research', title_ur: 'مقداری تحقیق' },
          { subtopic_id: 'LEC-EDU-17_T06_S03', title_en: 'Action Research', title_ur: 'عملی تحقیق' },
          { subtopic_id: 'LEC-EDU-17_T06_S04', title_en: 'Data Collection Methods', title_ur: 'ڈیٹا اکٹھا کرنے کے طریقے' },
          { subtopic_id: 'LEC-EDU-17_T06_S05', title_en: 'Report Writing', title_ur: 'رپورٹ نگاری' }
        ]
      },
      {
        topic_id: 'LEC-EDU-17_T07', post_topic_id: 'POST_10_T07',
        title_en: 'Educational Technology', title_ur: 'تعلیمی ٹیکنالوجی',
        subtopics: [
          { subtopic_id: 'LEC-EDU-17_T07_S01', title_en: 'ICT in Education', title_ur: 'تعلیم میں ICT' },
          { subtopic_id: 'LEC-EDU-17_T07_S02', title_en: 'E-learning', title_ur: 'آن لائن سیکھنا' },
          { subtopic_id: 'LEC-EDU-17_T07_S03', title_en: 'Multimedia Tools', title_ur: 'ملٹی میڈیا ٹولز' },
          { subtopic_id: 'LEC-EDU-17_T07_S04', title_en: 'Instructional Design Models', title_ur: 'تدریسی ڈیزائن ماڈل' },
          { subtopic_id: 'LEC-EDU-17_T07_S05', title_en: 'Online Education', title_ur: 'آن لائن تعلیم' }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────────────
  // POST 11 — Lecturer Physics (BS-17)
  // ─────────────────────────────────────────────────────────────────────
  'LEC-PHY-17': {
    post_id: 'LEC-PHY-17',
    title_en: 'Lecturer Physics',
    title_ur: 'لیکچرر طبیعیات',
    grade: 'BS-17',
    language: 'en',
    exam_weight_note: { top_3_topics: ['LEC-PHY-17_T06', 'LEC-PHY-17_T07', 'LEC-PHY-17_T01'] },
    topics: [
      {
        topic_id: 'LEC-PHY-17_T01', post_topic_id: 'POST_11_T01',
        title_en: 'Mechanics', title_ur: 'میکانیات',
        subtopics: [
          { subtopic_id: 'LEC-PHY-17_T01_S01', title_en: 'Kinematics', title_ur: 'حرکیات' },
          { subtopic_id: 'LEC-PHY-17_T01_S02', title_en: 'Dynamics', title_ur: 'حرکت الاشیاء' },
          { subtopic_id: 'LEC-PHY-17_T01_S03', title_en: 'Gravitation', title_ur: 'کشش ثقل' },
          { subtopic_id: 'LEC-PHY-17_T01_S04', title_en: 'Work / Energy / Power', title_ur: 'کام / توانائی / قوت' },
          { subtopic_id: 'LEC-PHY-17_T01_S05', title_en: 'Conservation Laws', title_ur: 'تحفظ کے قوانین' },
          { subtopic_id: 'LEC-PHY-17_T01_S06', title_en: 'Circular Motion', title_ur: 'دائروی حرکت' }
        ]
      },
      {
        topic_id: 'LEC-PHY-17_T02', post_topic_id: 'POST_11_T02',
        title_en: 'Properties of Matter', title_ur: 'مادے کی خصوصیات',
        subtopics: [
          { subtopic_id: 'LEC-PHY-17_T02_S01', title_en: 'Elasticity', title_ur: 'لچک' },
          { subtopic_id: 'LEC-PHY-17_T02_S02', title_en: 'Fluid Mechanics', title_ur: 'سیال میکانیات' },
          { subtopic_id: 'LEC-PHY-17_T02_S03', title_en: 'Buoyancy', title_ur: 'تیراؤ' },
          { subtopic_id: 'LEC-PHY-17_T02_S04', title_en: "Pascal's Principle", title_ur: 'پاسکل کا اصول' },
          { subtopic_id: 'LEC-PHY-17_T02_S05', title_en: "Bernoulli's Equation", title_ur: 'برنولی کی معادلہ' },
          { subtopic_id: 'LEC-PHY-17_T02_S06', title_en: 'Surface Tension', title_ur: 'سطحی تناؤ' },
          { subtopic_id: 'LEC-PHY-17_T02_S07', title_en: 'Viscosity', title_ur: 'لزوجت' }
        ]
      },
      {
        topic_id: 'LEC-PHY-17_T03', post_topic_id: 'POST_11_T03',
        title_en: 'Thermodynamics', title_ur: 'حرارتی حرکیات',
        subtopics: [
          { subtopic_id: 'LEC-PHY-17_T03_S01', title_en: 'Laws of Thermodynamics', title_ur: 'حرارتی حرکیات کے قوانین' },
          { subtopic_id: 'LEC-PHY-17_T03_S02', title_en: 'Heat Engines', title_ur: 'حرارتی انجن' },
          { subtopic_id: 'LEC-PHY-17_T03_S03', title_en: 'Thermal Expansion', title_ur: 'حرارتی پھیلاؤ' },
          { subtopic_id: 'LEC-PHY-17_T03_S04', title_en: 'Kinetic Theory', title_ur: 'حرکیاتی نظریہ' },
          { subtopic_id: 'LEC-PHY-17_T03_S05', title_en: 'Gas Laws', title_ur: 'گیس کے قوانین' },
          { subtopic_id: 'LEC-PHY-17_T03_S06', title_en: 'Maxwell-Boltzmann Distribution', title_ur: 'میکسویل-بولٹزمین تقسیم' }
        ]
      },
      {
        topic_id: 'LEC-PHY-17_T04', post_topic_id: 'POST_11_T04',
        title_en: 'Waves and Oscillations', title_ur: 'موجیں اور اہتزاز',
        subtopics: [
          { subtopic_id: 'LEC-PHY-17_T04_S01', title_en: 'SHM', title_ur: 'سادہ ہارمونک حرکت' },
          { subtopic_id: 'LEC-PHY-17_T04_S02', title_en: 'Pendulum', title_ur: 'لولک' },
          { subtopic_id: 'LEC-PHY-17_T04_S03', title_en: 'Wave Types', title_ur: 'موجوں کی اقسام' },
          { subtopic_id: 'LEC-PHY-17_T04_S04', title_en: 'Superposition', title_ur: 'تراکب' },
          { subtopic_id: 'LEC-PHY-17_T04_S05', title_en: 'Sound Waves', title_ur: 'آواز کی موجیں' },
          { subtopic_id: 'LEC-PHY-17_T04_S06', title_en: 'Doppler Effect', title_ur: 'ڈاپلر اثر' },
          { subtopic_id: 'LEC-PHY-17_T04_S07', title_en: 'Resonance', title_ur: 'گونج' }
        ]
      },
      {
        topic_id: 'LEC-PHY-17_T05', post_topic_id: 'POST_11_T05',
        title_en: 'Optics', title_ur: 'ضوئیات',
        subtopics: [
          { subtopic_id: 'LEC-PHY-17_T05_S01', title_en: 'Reflection', title_ur: 'انعکاس' },
          { subtopic_id: 'LEC-PHY-17_T05_S02', title_en: 'Refraction', title_ur: 'انکسار' },
          { subtopic_id: 'LEC-PHY-17_T05_S03', title_en: 'Lenses and Mirrors', title_ur: 'عدسے اور آئینے' },
          { subtopic_id: 'LEC-PHY-17_T05_S04', title_en: 'Optical Instruments', title_ur: 'روشنی کے آلات' },
          { subtopic_id: 'LEC-PHY-17_T05_S05', title_en: 'Interference', title_ur: 'تداخل' },
          { subtopic_id: 'LEC-PHY-17_T05_S06', title_en: 'Diffraction', title_ur: 'پراگندگی' },
          { subtopic_id: 'LEC-PHY-17_T05_S07', title_en: 'Polarization', title_ur: 'پولرائزیشن' }
        ]
      },
      {
        topic_id: 'LEC-PHY-17_T06', post_topic_id: 'POST_11_T06',
        title_en: 'Electricity and Magnetism', title_ur: 'برق و مقناطیس',
        subtopics: [
          { subtopic_id: 'LEC-PHY-17_T06_S01', title_en: "Coulomb's Law", title_ur: 'کولمب کا قانون' },
          { subtopic_id: 'LEC-PHY-17_T06_S02', title_en: 'Electric Field / Potential', title_ur: 'برقی میدان / قوت' },
          { subtopic_id: 'LEC-PHY-17_T06_S03', title_en: "Ohm's Law", title_ur: 'اوہم کا قانون' },
          { subtopic_id: 'LEC-PHY-17_T06_S04', title_en: "Kirchhoff's Laws", title_ur: 'کرخوف کے قوانین' },
          { subtopic_id: 'LEC-PHY-17_T06_S05', title_en: 'Magnetic Field', title_ur: 'مقناطیسی میدان' },
          { subtopic_id: 'LEC-PHY-17_T06_S06', title_en: 'Electromagnetic Induction', title_ur: 'برقی مقناطیسی حثیت' },
          { subtopic_id: 'LEC-PHY-17_T06_S07', title_en: "Faraday's / Lenz's Law", title_ur: 'فیرڈے / لینز کا قانون' }
        ]
      },
      {
        topic_id: 'LEC-PHY-17_T07', post_topic_id: 'POST_11_T07',
        title_en: 'Modern Physics', title_ur: 'جدید طبیعیات',
        subtopics: [
          { subtopic_id: 'LEC-PHY-17_T07_S01', title_en: 'Atomic Structure', title_ur: 'ایٹمی ساخت' },
          { subtopic_id: 'LEC-PHY-17_T07_S02', title_en: 'Bohr Model', title_ur: 'بور ماڈل' },
          { subtopic_id: 'LEC-PHY-17_T07_S03', title_en: 'Quantum Numbers', title_ur: 'کوانٹم نمبر' },
          { subtopic_id: 'LEC-PHY-17_T07_S04', title_en: 'Radioactivity', title_ur: 'تابکاری' },
          { subtopic_id: 'LEC-PHY-17_T07_S05', title_en: 'Nuclear Reactions', title_ur: 'جوہری تعاملات' },
          { subtopic_id: 'LEC-PHY-17_T07_S06', title_en: 'Photoelectric Effect', title_ur: 'ضوئی برقی اثر' },
          { subtopic_id: 'LEC-PHY-17_T07_S07', title_en: 'Special Relativity', title_ur: 'خصوصی اضافیت' },
          { subtopic_id: 'LEC-PHY-17_T07_S08', title_en: 'Wave-Particle Duality', title_ur: 'موج ذرہ دوگانگی' }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────────────
  // POST 12 — Lecturer Chemistry (BS-17)
  // ─────────────────────────────────────────────────────────────────────
  'LEC-CHM-17': {
    post_id: 'LEC-CHM-17',
    title_en: 'Lecturer Chemistry',
    title_ur: 'لیکچرر کیمیا',
    grade: 'BS-17',
    language: 'en',
    exam_weight_note: { top_3_topics: ['LEC-CHM-17_T04', 'LEC-CHM-17_T02', 'LEC-CHM-17_T01'] },
    topics: [
      {
        topic_id: 'LEC-CHM-17_T01', post_topic_id: 'POST_12_T01',
        title_en: 'General Chemistry', title_ur: 'عام کیمیا',
        subtopics: [
          { subtopic_id: 'LEC-CHM-17_T01_S01', title_en: 'Atomic Structure', title_ur: 'ایٹمی ساخت' },
          { subtopic_id: 'LEC-CHM-17_T01_S02', title_en: 'Periodic Table Trends', title_ur: 'دوری جدول کے رجحانات' },
          { subtopic_id: 'LEC-CHM-17_T01_S03', title_en: 'Chemical Bonding', title_ur: 'کیمیائی بندھن' },
          { subtopic_id: 'LEC-CHM-17_T01_S04', title_en: 'VSEPR', title_ur: 'VSEPR' },
          { subtopic_id: 'LEC-CHM-17_T01_S05', title_en: 'Hybridization', title_ur: 'ہائبریڈائزیشن' },
          { subtopic_id: 'LEC-CHM-17_T01_S06', title_en: 'Gas Laws', title_ur: 'گیس کے قوانین' },
          { subtopic_id: 'LEC-CHM-17_T01_S07', title_en: 'Stoichiometry and Mole Concept', title_ur: 'ستوئیومیٹری اور تل تصور' }
        ]
      },
      {
        topic_id: 'LEC-CHM-17_T02', post_topic_id: 'POST_12_T02',
        title_en: 'Physical Chemistry', title_ur: 'طبعی کیمیا',
        subtopics: [
          { subtopic_id: 'LEC-CHM-17_T02_S01', title_en: 'Thermodynamics Laws', title_ur: 'حرارتی حرکیات کے قوانین' },
          { subtopic_id: 'LEC-CHM-17_T02_S02', title_en: 'Enthalpy / Entropy / Gibbs', title_ur: 'اینتھالپی / اینٹروپی / گبز' },
          { subtopic_id: 'LEC-CHM-17_T02_S03', title_en: 'Chemical Kinetics', title_ur: 'کیمیائی حرکیات' },
          { subtopic_id: 'LEC-CHM-17_T02_S04', title_en: 'Rate Laws', title_ur: 'شرح قوانین' },
          { subtopic_id: 'LEC-CHM-17_T02_S05', title_en: 'Catalysis', title_ur: 'حثیثیت' },
          { subtopic_id: 'LEC-CHM-17_T02_S06', title_en: 'Chemical Equilibrium', title_ur: 'کیمیائی توازن' },
          { subtopic_id: 'LEC-CHM-17_T02_S07', title_en: 'Electrochemistry', title_ur: 'برقی کیمیا' }
        ]
      },
      {
        topic_id: 'LEC-CHM-17_T03', post_topic_id: 'POST_12_T03',
        title_en: 'Inorganic Chemistry', title_ur: 'غیر نامیاتی کیمیا',
        subtopics: [
          { subtopic_id: 'LEC-CHM-17_T03_S01', title_en: 'Periodic Trends', title_ur: 'دوری رجحانات' },
          { subtopic_id: 'LEC-CHM-17_T03_S02', title_en: 'Acids and Bases', title_ur: 'تیزاب اور الکلی' },
          { subtopic_id: 'LEC-CHM-17_T03_S03', title_en: 'pH Calculations', title_ur: 'pH حسابات' },
          { subtopic_id: 'LEC-CHM-17_T03_S04', title_en: 'Buffer Solutions', title_ur: 'بفر محلول' },
          { subtopic_id: 'LEC-CHM-17_T03_S05', title_en: 'Coordination Compounds', title_ur: 'ہم آہنگی مرکبات' },
          { subtopic_id: 'LEC-CHM-17_T03_S06', title_en: 'Metals and Non-metals', title_ur: 'دھاتیں اور غیر دھاتیں' }
        ]
      },
      {
        topic_id: 'LEC-CHM-17_T04', post_topic_id: 'POST_12_T04',
        title_en: 'Organic Chemistry', title_ur: 'نامیاتی کیمیا',
        subtopics: [
          { subtopic_id: 'LEC-CHM-17_T04_S01', title_en: 'Hybridization', title_ur: 'ہائبریڈائزیشن' },
          { subtopic_id: 'LEC-CHM-17_T04_S02', title_en: 'Functional Groups', title_ur: 'فنکشنل گروپ' },
          { subtopic_id: 'LEC-CHM-17_T04_S03', title_en: 'Hydrocarbons', title_ur: 'ہائیڈرو کاربن' },
          { subtopic_id: 'LEC-CHM-17_T04_S04', title_en: 'Isomerism', title_ur: 'ہم ریخت' },
          { subtopic_id: 'LEC-CHM-17_T04_S05', title_en: 'Reaction Mechanisms', title_ur: 'تعامل کے طریقہ کار' },
          { subtopic_id: 'LEC-CHM-17_T04_S06', title_en: 'Stereochemistry', title_ur: 'مجسم کیمیا' },
          { subtopic_id: 'LEC-CHM-17_T04_S07', title_en: 'Biomolecules', title_ur: 'حیاتی مالیکیول' },
          { subtopic_id: 'LEC-CHM-17_T04_S08', title_en: 'Polymers', title_ur: 'کثیر الجزیی' }
        ]
      },
      {
        topic_id: 'LEC-CHM-17_T05', post_topic_id: 'POST_12_T05',
        title_en: 'Analytical Chemistry', title_ur: 'تجزیاتی کیمیا',
        subtopics: [
          { subtopic_id: 'LEC-CHM-17_T05_S01', title_en: 'Qualitative Analysis', title_ur: 'نوعی تجزیہ' },
          { subtopic_id: 'LEC-CHM-17_T05_S02', title_en: 'Quantitative Analysis', title_ur: 'مقداری تجزیہ' },
          { subtopic_id: 'LEC-CHM-17_T05_S03', title_en: 'Titrations', title_ur: 'ٹائٹریشن' },
          { subtopic_id: 'LEC-CHM-17_T05_S04', title_en: 'Chromatography', title_ur: 'کرومیٹوگرافی' },
          { subtopic_id: 'LEC-CHM-17_T05_S05', title_en: 'Spectroscopy Techniques', title_ur: 'طیف نگاری تکنیک' }
        ]
      },
      {
        topic_id: 'LEC-CHM-17_T06', post_topic_id: 'POST_12_T06',
        title_en: 'Industrial Chemistry', title_ur: 'صنعتی کیمیا',
        subtopics: [
          { subtopic_id: 'LEC-CHM-17_T06_S01', title_en: 'Fertilizer Industry', title_ur: 'کھاد کی صنعت' },
          { subtopic_id: 'LEC-CHM-17_T06_S02', title_en: 'Petrochemicals', title_ur: 'پیٹروکیمیکل' },
          { subtopic_id: 'LEC-CHM-17_T06_S03', title_en: 'Pharmaceutical Chemistry', title_ur: 'دوا سازی کیمیا' },
          { subtopic_id: 'LEC-CHM-17_T06_S04', title_en: 'Environmental Chemistry', title_ur: 'ماحولیاتی کیمیا' },
          { subtopic_id: 'LEC-CHM-17_T06_S05', title_en: 'Pollution and Waste Management', title_ur: 'آلودگی اور فضلہ' }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────────────
  // POST 13 — Lecturer Mathematics (BS-17)
  // ─────────────────────────────────────────────────────────────────────
  'LEC-MTH-17': {
    post_id: 'LEC-MTH-17',
    title_en: 'Lecturer Mathematics',
    title_ur: 'لیکچرر ریاضی',
    grade: 'BS-17',
    language: 'en',
    exam_weight_note: { top_3_topics: ['LEC-MTH-17_T02', 'LEC-MTH-17_T01', 'LEC-MTH-17_T05'] },
    topics: [
      {
        topic_id: 'LEC-MTH-17_T01', post_topic_id: 'POST_13_T01',
        title_en: 'Algebra', title_ur: 'الجبرا',
        subtopics: [
          { subtopic_id: 'LEC-MTH-17_T01_S01', title_en: 'Sets and Functions', title_ur: 'مجموعے اور فنکشن' },
          { subtopic_id: 'LEC-MTH-17_T01_S02', title_en: 'Matrices and Determinants', title_ur: 'میٹرکس اور ڈٹرمننٹ' },
          { subtopic_id: 'LEC-MTH-17_T01_S03', title_en: 'Complex Numbers', title_ur: 'پیچیدہ اعداد' },
          { subtopic_id: 'LEC-MTH-17_T01_S04', title_en: 'Sequences and Series', title_ur: 'تسلسل اور سلسلہ' },
          { subtopic_id: 'LEC-MTH-17_T01_S05', title_en: 'Binomial Theorem', title_ur: 'ثنائی نظریہ' }
        ]
      },
      {
        topic_id: 'LEC-MTH-17_T02', post_topic_id: 'POST_13_T02',
        title_en: 'Calculus', title_ur: 'حسبان',
        subtopics: [
          { subtopic_id: 'LEC-MTH-17_T02_S01', title_en: 'Limits and Continuity', title_ur: 'حدود اور تسلسل' },
          { subtopic_id: 'LEC-MTH-17_T02_S02', title_en: 'Differentiation', title_ur: 'تفریق' },
          { subtopic_id: 'LEC-MTH-17_T02_S03', title_en: 'Integration Techniques', title_ur: 'انضمام کی تکنیک' },
          { subtopic_id: 'LEC-MTH-17_T02_S04', title_en: 'Multivariable Calculus', title_ur: 'متعدد متغیر حسبان' },
          { subtopic_id: 'LEC-MTH-17_T02_S05', title_en: 'Applications of Derivatives', title_ur: 'مشتقات کا اطلاق' },
          { subtopic_id: 'LEC-MTH-17_T02_S06', title_en: 'Area and Volume', title_ur: 'رقبہ اور حجم' }
        ]
      },
      {
        topic_id: 'LEC-MTH-17_T03', post_topic_id: 'POST_13_T03',
        title_en: 'Analytic Geometry', title_ur: 'تجزیاتی ہندسہ',
        subtopics: [
          { subtopic_id: 'LEC-MTH-17_T03_S01', title_en: '2D Coordinate Geometry', title_ur: '2D ہندسہ' },
          { subtopic_id: 'LEC-MTH-17_T03_S02', title_en: 'Conic Sections', title_ur: 'مخروطی قطوع' },
          { subtopic_id: 'LEC-MTH-17_T03_S03', title_en: '3D Geometry', title_ur: '3D ہندسہ' },
          { subtopic_id: 'LEC-MTH-17_T03_S04', title_en: 'Vectors', title_ur: 'ویکٹر' },
          { subtopic_id: 'LEC-MTH-17_T03_S05', title_en: 'Distance and Section Formulas', title_ur: 'فاصلہ اور سیکشن فارمولے' }
        ]
      },
      {
        topic_id: 'LEC-MTH-17_T04', post_topic_id: 'POST_13_T04',
        title_en: 'Linear Algebra', title_ur: 'خطی الجبرا',
        subtopics: [
          { subtopic_id: 'LEC-MTH-17_T04_S01', title_en: 'Vector Spaces', title_ur: 'ویکٹر خلا' },
          { subtopic_id: 'LEC-MTH-17_T04_S02', title_en: 'Linear Transformations', title_ur: 'خطی تبدیلیاں' },
          { subtopic_id: 'LEC-MTH-17_T04_S03', title_en: 'Eigenvalues and Eigenvectors', title_ur: 'ایگن قدر اور ایگن ویکٹر' },
          { subtopic_id: 'LEC-MTH-17_T04_S04', title_en: 'Linear Equations Systems', title_ur: 'خطی مساوات کا نظام' },
          { subtopic_id: 'LEC-MTH-17_T04_S05', title_en: 'Basis and Dimension', title_ur: 'بنیاد اور جہت' }
        ]
      },
      {
        topic_id: 'LEC-MTH-17_T05', post_topic_id: 'POST_13_T05',
        title_en: 'Differential Equations', title_ur: 'تفریقی مساوات',
        subtopics: [
          { subtopic_id: 'LEC-MTH-17_T05_S01', title_en: 'First-order ODEs', title_ur: 'پہلے درجے کی ODE' },
          { subtopic_id: 'LEC-MTH-17_T05_S02', title_en: 'Higher-order ODEs', title_ur: 'اعلیٰ درجے کی ODE' },
          { subtopic_id: 'LEC-MTH-17_T05_S03', title_en: 'Homogeneous / Non-homogeneous Equations', title_ur: 'یکسان / غیر یکسان مساوات' },
          { subtopic_id: 'LEC-MTH-17_T05_S04', title_en: 'Method of Undetermined Coefficients', title_ur: 'نامعلوم گتانک کا طریقہ' },
          { subtopic_id: 'LEC-MTH-17_T05_S05', title_en: 'Laplace Transform', title_ur: 'لاپلیس تبدیل' }
        ]
      },
      {
        topic_id: 'LEC-MTH-17_T06', post_topic_id: 'POST_13_T06',
        title_en: 'Probability and Statistics', title_ur: 'امکانات اور اعداد و شمار',
        subtopics: [
          { subtopic_id: 'LEC-MTH-17_T06_S01', title_en: 'Probability Concepts', title_ur: 'امکانات کے تصورات' },
          { subtopic_id: 'LEC-MTH-17_T06_S02', title_en: 'Conditional Probability', title_ur: 'مشروط امکان' },
          { subtopic_id: 'LEC-MTH-17_T06_S03', title_en: 'Bayes Theorem', title_ur: 'بیز نظریہ' },
          { subtopic_id: 'LEC-MTH-17_T06_S04', title_en: 'Random Variables', title_ur: 'بے ترتیب متغیر' },
          { subtopic_id: 'LEC-MTH-17_T06_S05', title_en: 'Binomial / Poisson / Normal Distributions', title_ur: 'ثنائی / پوایسن / عام تقسیم' }
        ]
      },
      {
        topic_id: 'LEC-MTH-17_T07', post_topic_id: 'POST_13_T07',
        title_en: 'Numerical Methods', title_ur: 'عددی طریقے',
        subtopics: [
          { subtopic_id: 'LEC-MTH-17_T07_S01', title_en: 'Numerical Solutions of Equations', title_ur: 'مساوات کے عددی حل' },
          { subtopic_id: 'LEC-MTH-17_T07_S02', title_en: 'Interpolation', title_ur: 'بین قیمت' },
          { subtopic_id: 'LEC-MTH-17_T07_S03', title_en: 'Numerical Differentiation / Integration', title_ur: 'عددی تفریق / انضمام' },
          { subtopic_id: 'LEC-MTH-17_T07_S04', title_en: 'Newton-Raphson Method', title_ur: 'نیوٹن رافسن طریقہ' },
          { subtopic_id: 'LEC-MTH-17_T07_S05', title_en: 'Error Analysis', title_ur: 'غلطی تجزیہ' }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────────────
  // POST 14 — Lecturer Computer Science (BS-17)
  // ─────────────────────────────────────────────────────────────────────
  'LEC-CS-17': {
    post_id: 'LEC-CS-17',
    title_en: 'Lecturer Computer Science',
    title_ur: 'لیکچرر کمپیوٹر سائنس',
    grade: 'BS-17',
    language: 'en',
    exam_weight_note: { top_3_topics: ['LEC-CS-17_T02', 'LEC-CS-17_T03', 'LEC-CS-17_T04'] },
    topics: [
      {
        topic_id: 'LEC-CS-17_T01', post_topic_id: 'POST_14_T01',
        title_en: 'Programming Fundamentals', title_ur: 'پروگرامنگ کی بنیادیں',
        subtopics: [
          { subtopic_id: 'LEC-CS-17_T01_S01', title_en: 'Variables and Data Types', title_ur: 'متغیر اور ڈیٹا کی اقسام' },
          { subtopic_id: 'LEC-CS-17_T01_S02', title_en: 'Control Structures', title_ur: 'کنٹرول ڈھانچے' },
          { subtopic_id: 'LEC-CS-17_T01_S03', title_en: 'Functions', title_ur: 'فنکشن' },
          { subtopic_id: 'LEC-CS-17_T01_S04', title_en: 'Arrays', title_ur: 'ارے' },
          { subtopic_id: 'LEC-CS-17_T01_S05', title_en: 'Recursion', title_ur: 'تعود' },
          { subtopic_id: 'LEC-CS-17_T01_S06', title_en: 'Object-Oriented Programming Basics', title_ur: 'OOP کی بنیادیں' }
        ]
      },
      {
        topic_id: 'LEC-CS-17_T02', post_topic_id: 'POST_14_T02',
        title_en: 'Data Structures and Algorithms', title_ur: 'ڈیٹا ڈھانچے اور الگورتھم',
        subtopics: [
          { subtopic_id: 'LEC-CS-17_T02_S01', title_en: 'Arrays', title_ur: 'ارے' },
          { subtopic_id: 'LEC-CS-17_T02_S02', title_en: 'Linked Lists', title_ur: 'منسلک فہرست' },
          { subtopic_id: 'LEC-CS-17_T02_S03', title_en: 'Stacks', title_ur: 'اسٹیک' },
          { subtopic_id: 'LEC-CS-17_T02_S04', title_en: 'Queues', title_ur: 'قطار' },
          { subtopic_id: 'LEC-CS-17_T02_S05', title_en: 'Trees', title_ur: 'درخت' },
          { subtopic_id: 'LEC-CS-17_T02_S06', title_en: 'Graphs', title_ur: 'گراف' },
          { subtopic_id: 'LEC-CS-17_T02_S07', title_en: 'Sorting Algorithms', title_ur: 'ترتیب الگورتھم' },
          { subtopic_id: 'LEC-CS-17_T02_S08', title_en: 'Searching Algorithms', title_ur: 'تلاش الگورتھم' },
          { subtopic_id: 'LEC-CS-17_T02_S09', title_en: 'Algorithm Complexity (Big-O)', title_ur: 'الگورتھم پیچیدگی (Big-O)' }
        ]
      },
      {
        topic_id: 'LEC-CS-17_T03', post_topic_id: 'POST_14_T03',
        title_en: 'Database Management Systems', title_ur: 'ڈیٹا بیس مینجمنٹ سسٹم',
        subtopics: [
          { subtopic_id: 'LEC-CS-17_T03_S01', title_en: 'Relational Model', title_ur: 'رشتہ داری ماڈل' },
          { subtopic_id: 'LEC-CS-17_T03_S02', title_en: 'SQL', title_ur: 'SQL' },
          { subtopic_id: 'LEC-CS-17_T03_S03', title_en: 'Normalization', title_ur: 'معمول بندی' },
          { subtopic_id: 'LEC-CS-17_T03_S04', title_en: 'ER Diagrams', title_ur: 'ER خاکے' },
          { subtopic_id: 'LEC-CS-17_T03_S05', title_en: 'Transactions', title_ur: 'لین دین' },
          { subtopic_id: 'LEC-CS-17_T03_S06', title_en: 'ACID Properties', title_ur: 'ACID خصوصیات' },
          { subtopic_id: 'LEC-CS-17_T03_S07', title_en: 'Indexing', title_ur: 'انڈیکسنگ' }
        ]
      },
      {
        topic_id: 'LEC-CS-17_T04', post_topic_id: 'POST_14_T04',
        title_en: 'Operating Systems', title_ur: 'آپریٹنگ سسٹم',
        subtopics: [
          { subtopic_id: 'LEC-CS-17_T04_S01', title_en: 'Process Management', title_ur: 'عمل انتظام' },
          { subtopic_id: 'LEC-CS-17_T04_S02', title_en: 'Memory Management', title_ur: 'میموری انتظام' },
          { subtopic_id: 'LEC-CS-17_T04_S03', title_en: 'File Systems', title_ur: 'فائل سسٹم' },
          { subtopic_id: 'LEC-CS-17_T04_S04', title_en: 'Scheduling Algorithms', title_ur: 'شیڈولنگ الگورتھم' },
          { subtopic_id: 'LEC-CS-17_T04_S05', title_en: 'Deadlocks', title_ur: 'ڈیڈ لاک' },
          { subtopic_id: 'LEC-CS-17_T04_S06', title_en: 'Virtual Memory', title_ur: 'ورچوئل میموری' }
        ]
      },
      {
        topic_id: 'LEC-CS-17_T05', post_topic_id: 'POST_14_T05',
        title_en: 'Computer Networks', title_ur: 'کمپیوٹر نیٹ ورک',
        subtopics: [
          { subtopic_id: 'LEC-CS-17_T05_S01', title_en: 'OSI Model', title_ur: 'OSI ماڈل' },
          { subtopic_id: 'LEC-CS-17_T05_S02', title_en: 'TCP/IP', title_ur: 'TCP/IP' },
          { subtopic_id: 'LEC-CS-17_T05_S03', title_en: 'Network Topologies', title_ur: 'نیٹ ورک ٹوپولوجی' },
          { subtopic_id: 'LEC-CS-17_T05_S04', title_en: 'IP Addressing', title_ur: 'IP ایڈریسنگ' },
          { subtopic_id: 'LEC-CS-17_T05_S05', title_en: 'Subnetting', title_ur: 'سب نیٹنگ' },
          { subtopic_id: 'LEC-CS-17_T05_S06', title_en: 'Routing Protocols', title_ur: 'روٹنگ پروٹوکول' },
          { subtopic_id: 'LEC-CS-17_T05_S07', title_en: 'Network Security Basics', title_ur: 'نیٹ ورک سیکیورٹی کی بنیادیں' }
        ]
      },
      {
        topic_id: 'LEC-CS-17_T06', post_topic_id: 'POST_14_T06',
        title_en: 'Software Engineering', title_ur: 'سافٹ ویئر انجینئرنگ',
        subtopics: [
          { subtopic_id: 'LEC-CS-17_T06_S01', title_en: 'SDLC Models', title_ur: 'SDLC ماڈل' },
          { subtopic_id: 'LEC-CS-17_T06_S02', title_en: 'Requirements Engineering', title_ur: 'ضروریات انجینئرنگ' },
          { subtopic_id: 'LEC-CS-17_T06_S03', title_en: 'Software Design', title_ur: 'سافٹ ویئر ڈیزائن' },
          { subtopic_id: 'LEC-CS-17_T06_S04', title_en: 'Testing Types', title_ur: 'ٹیسٹنگ کی اقسام' },
          { subtopic_id: 'LEC-CS-17_T06_S05', title_en: 'Project Management', title_ur: 'منصوبہ انتظام' },
          { subtopic_id: 'LEC-CS-17_T06_S06', title_en: 'Agile Methodology', title_ur: 'ایجائل طریقہ کار' }
        ]
      },
      {
        topic_id: 'LEC-CS-17_T07', post_topic_id: 'POST_14_T07',
        title_en: 'Web Technologies', title_ur: 'ویب ٹیکنالوجیز',
        subtopics: [
          { subtopic_id: 'LEC-CS-17_T07_S01', title_en: 'HTML / CSS Basics', title_ur: 'HTML / CSS کی بنیادیں' },
          { subtopic_id: 'LEC-CS-17_T07_S02', title_en: 'JavaScript Fundamentals', title_ur: 'جاوا اسکرپٹ کی بنیادیں' },
          { subtopic_id: 'LEC-CS-17_T07_S03', title_en: 'Web Servers', title_ur: 'ویب سرور' },
          { subtopic_id: 'LEC-CS-17_T07_S04', title_en: 'HTTP Protocol', title_ur: 'HTTP پروٹوکول' },
          { subtopic_id: 'LEC-CS-17_T07_S05', title_en: 'Client-Server Architecture', title_ur: 'کلائنٹ-سرور فن تعمیر' }
        ]
      },
      {
        topic_id: 'LEC-CS-17_T08', post_topic_id: 'POST_14_T08',
        title_en: 'Artificial Intelligence Basics', title_ur: 'مصنوعی ذہانت کی بنیادیں',
        subtopics: [
          { subtopic_id: 'LEC-CS-17_T08_S01', title_en: 'AI Concepts', title_ur: 'مصنوعی ذہانت کے تصورات' },
          { subtopic_id: 'LEC-CS-17_T08_S02', title_en: 'Machine Learning Overview', title_ur: 'مشین سیکھنے کا جائزہ' },
          { subtopic_id: 'LEC-CS-17_T08_S03', title_en: 'Search Algorithms', title_ur: 'تلاش الگورتھم' },
          { subtopic_id: 'LEC-CS-17_T08_S04', title_en: 'Knowledge Representation', title_ur: 'علم کی نمائندگی' },
          { subtopic_id: 'LEC-CS-17_T08_S05', title_en: 'Neural Networks Basics', title_ur: 'عصبی نیٹ ورک کی بنیادیں' }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────────────
  // POST 15 — Lecturer Botany (BS-17)
  // ─────────────────────────────────────────────────────────────────────
  'LEC-BOT-17': {
    post_id: 'LEC-BOT-17',
    title_en: 'Lecturer Botany',
    title_ur: 'لیکچرر نباتیات',
    grade: 'BS-17',
    language: 'en',
    exam_weight_note: { top_3_topics: ['LEC-BOT-17_T03', 'LEC-BOT-17_T04', 'LEC-BOT-17_T02'] },
    topics: [
      {
        topic_id: 'LEC-BOT-17_T01', post_topic_id: 'POST_15_T01',
        title_en: 'Plant Taxonomy', title_ur: 'نباتاتی درجہ بندی',
        subtopics: [
          { subtopic_id: 'LEC-BOT-17_T01_S01', title_en: 'Classification Principles', title_ur: 'درجہ بندی کے اصول' },
          { subtopic_id: 'LEC-BOT-17_T01_S02', title_en: 'Binomial Nomenclature', title_ur: 'دو نامی اصطلاح' },
          { subtopic_id: 'LEC-BOT-17_T01_S03', title_en: 'Taxonomic Hierarchy', title_ur: 'درجہ بندی کی سطح' },
          { subtopic_id: 'LEC-BOT-17_T01_S04', title_en: 'Major Plant Families', title_ur: 'اہم نباتاتی خاندان' },
          { subtopic_id: 'LEC-BOT-17_T01_S05', title_en: 'Angiosperms vs Gymnosperms', title_ur: 'پھول دار بمقابلہ بے پھول' }
        ]
      },
      {
        topic_id: 'LEC-BOT-17_T02', post_topic_id: 'POST_15_T02',
        title_en: 'Plant Anatomy', title_ur: 'نباتاتی تشریح',
        subtopics: [
          { subtopic_id: 'LEC-BOT-17_T02_S01', title_en: 'Cell Organelles', title_ur: 'خلیاتی اعضا' },
          { subtopic_id: 'LEC-BOT-17_T02_S02', title_en: 'Meristematic Tissues', title_ur: 'نمو پذیر نسیج' },
          { subtopic_id: 'LEC-BOT-17_T02_S03', title_en: 'Permanent Tissues', title_ur: 'مستقل نسیج' },
          { subtopic_id: 'LEC-BOT-17_T02_S04', title_en: 'Root Anatomy', title_ur: 'جڑ کی تشریح' },
          { subtopic_id: 'LEC-BOT-17_T02_S05', title_en: 'Stem Anatomy', title_ur: 'تنے کی تشریح' },
          { subtopic_id: 'LEC-BOT-17_T02_S06', title_en: 'Leaf Anatomy', title_ur: 'پتے کی تشریح' },
          { subtopic_id: 'LEC-BOT-17_T02_S07', title_en: 'Xylem and Phloem', title_ur: 'زائلم اور فلوئم' },
          { subtopic_id: 'LEC-BOT-17_T02_S08', title_en: 'Secondary Growth', title_ur: 'ثانوی نشوونما' }
        ]
      },
      {
        topic_id: 'LEC-BOT-17_T03', post_topic_id: 'POST_15_T03',
        title_en: 'Plant Physiology', title_ur: 'نباتاتی فزیالوجی',
        subtopics: [
          { subtopic_id: 'LEC-BOT-17_T03_S01', title_en: 'Photosynthesis Light Reactions', title_ur: 'ضیائی ترکیب روشنی تعاملات' },
          { subtopic_id: 'LEC-BOT-17_T03_S02', title_en: 'Calvin Cycle', title_ur: 'کیلون چکر' },
          { subtopic_id: 'LEC-BOT-17_T03_S03', title_en: 'C3 / C4 / CAM Pathways', title_ur: 'C3 / C4 / CAM راستے' },
          { subtopic_id: 'LEC-BOT-17_T03_S04', title_en: 'Glycolysis', title_ur: 'گلائیکولیسس' },
          { subtopic_id: 'LEC-BOT-17_T03_S05', title_en: 'Krebs Cycle', title_ur: 'کریبس چکر' },
          { subtopic_id: 'LEC-BOT-17_T03_S06', title_en: 'Transpiration', title_ur: 'بخارات' },
          { subtopic_id: 'LEC-BOT-17_T03_S07', title_en: 'Mineral Nutrition', title_ur: 'معدنی غذائیت' },
          { subtopic_id: 'LEC-BOT-17_T03_S08', title_en: 'Plant Hormones', title_ur: 'نباتاتی ہارمون' }
        ]
      },
      {
        topic_id: 'LEC-BOT-17_T04', post_topic_id: 'POST_15_T04',
        title_en: 'Plant Genetics', title_ur: 'نباتاتی وراثت',
        subtopics: [
          { subtopic_id: 'LEC-BOT-17_T04_S01', title_en: 'Mendelian Genetics', title_ur: 'مینڈل کی وراثت' },
          { subtopic_id: 'LEC-BOT-17_T04_S02', title_en: 'Chromosomal Theory', title_ur: 'کروموسوم نظریہ' },
          { subtopic_id: 'LEC-BOT-17_T04_S03', title_en: 'DNA / RNA Structure', title_ur: 'DNA / RNA ساخت' },
          { subtopic_id: 'LEC-BOT-17_T04_S04', title_en: 'Gene Expression', title_ur: 'جین اظہار' },
          { subtopic_id: 'LEC-BOT-17_T04_S05', title_en: 'Mutations', title_ur: 'تغیرات' },
          { subtopic_id: 'LEC-BOT-17_T04_S06', title_en: 'Biotechnology Applications', title_ur: 'بائیو ٹیکنالوجی کا اطلاق' }
        ]
      },
      {
        topic_id: 'LEC-BOT-17_T05', post_topic_id: 'POST_15_T05',
        title_en: 'Plant Ecology', title_ur: 'نباتاتی ماحولیات',
        subtopics: [
          { subtopic_id: 'LEC-BOT-17_T05_S01', title_en: 'Ecosystems', title_ur: 'ماحولیاتی نظام' },
          { subtopic_id: 'LEC-BOT-17_T05_S02', title_en: 'Biomes', title_ur: 'حیاتی علاقے' },
          { subtopic_id: 'LEC-BOT-17_T05_S03', title_en: 'Plant Adaptations', title_ur: 'نباتاتی ہم آہنگی' },
          { subtopic_id: 'LEC-BOT-17_T05_S04', title_en: 'Population Ecology', title_ur: 'آبادی ماحولیات' },
          { subtopic_id: 'LEC-BOT-17_T05_S05', title_en: 'Community Interactions', title_ur: 'برادری تعاملات' },
          { subtopic_id: 'LEC-BOT-17_T05_S06', title_en: 'Conservation', title_ur: 'تحفظ' }
        ]
      },
      {
        topic_id: 'LEC-BOT-17_T06', post_topic_id: 'POST_15_T06',
        title_en: 'Plant Morphology', title_ur: 'نباتاتی شکل شناسی',
        subtopics: [
          { subtopic_id: 'LEC-BOT-17_T06_S01', title_en: 'Root Types', title_ur: 'جڑوں کی اقسام' },
          { subtopic_id: 'LEC-BOT-17_T06_S02', title_en: 'Stem Modifications', title_ur: 'تنے کی ترمیمات' },
          { subtopic_id: 'LEC-BOT-17_T06_S03', title_en: 'Leaf Types', title_ur: 'پتوں کی اقسام' },
          { subtopic_id: 'LEC-BOT-17_T06_S04', title_en: 'Inflorescence Types', title_ur: 'پھول کے گچھے کی اقسام' },
          { subtopic_id: 'LEC-BOT-17_T06_S05', title_en: 'Flower Structure', title_ur: 'پھول کی ساخت' },
          { subtopic_id: 'LEC-BOT-17_T06_S06', title_en: 'Fruit Types', title_ur: 'پھلوں کی اقسام' },
          { subtopic_id: 'LEC-BOT-17_T06_S07', title_en: 'Seed Structure', title_ur: 'بیج کی ساخت' },
          { subtopic_id: 'LEC-BOT-17_T06_S08', title_en: 'Pollination Mechanisms', title_ur: 'زیر گلی کے طریقے' }
        ]
      },
      {
        topic_id: 'LEC-BOT-17_T07', post_topic_id: 'POST_15_T07',
        title_en: 'Plant Pathology', title_ur: 'نباتاتی بیماریاں',
        subtopics: [
          { subtopic_id: 'LEC-BOT-17_T07_S01', title_en: 'Fungal Diseases', title_ur: 'فنگل بیماریاں' },
          { subtopic_id: 'LEC-BOT-17_T07_S02', title_en: 'Bacterial Diseases', title_ur: 'جراثیمی بیماریاں' },
          { subtopic_id: 'LEC-BOT-17_T07_S03', title_en: 'Viral Diseases', title_ur: 'وائرل بیماریاں' },
          { subtopic_id: 'LEC-BOT-17_T07_S04', title_en: 'Nematode Diseases', title_ur: 'نیماٹوڈ بیماریاں' },
          { subtopic_id: 'LEC-BOT-17_T07_S05', title_en: 'Disease Control', title_ur: 'بیماری پر قابو' },
          { subtopic_id: 'LEC-BOT-17_T07_S06', title_en: 'Integrated Pest Management', title_ur: 'یکجا کیڑوں کا انتظام' }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────────────
  // POST 16 — Lecturer Zoology (BS-17)
  // ─────────────────────────────────────────────────────────────────────
  'LEC-ZOO-17': {
    post_id: 'LEC-ZOO-17',
    title_en: 'Lecturer Zoology',
    title_ur: 'لیکچرر حیوانیات',
    grade: 'BS-17',
    language: 'en',
    exam_weight_note: { top_3_topics: ['LEC-ZOO-17_T02', 'LEC-ZOO-17_T03', 'LEC-ZOO-17_T01'] },
    topics: [
      {
        topic_id: 'LEC-ZOO-17_T01', post_topic_id: 'POST_16_T01',
        title_en: 'Animal Classification', title_ur: 'حیوانی درجہ بندی',
        subtopics: [
          { subtopic_id: 'LEC-ZOO-17_T01_S01', title_en: 'Kingdom Animalia Overview', title_ur: 'حیوان مملکت کا جائزہ' },
          { subtopic_id: 'LEC-ZOO-17_T01_S02', title_en: 'Porifera', title_ur: 'پوریفیرا' },
          { subtopic_id: 'LEC-ZOO-17_T01_S03', title_en: 'Coelenterata', title_ur: 'سیلینٹریٹا' },
          { subtopic_id: 'LEC-ZOO-17_T01_S04', title_en: 'Platyhelminthes', title_ur: 'پلیٹی ہیلمنتھیز' },
          { subtopic_id: 'LEC-ZOO-17_T01_S05', title_en: 'Nematoda', title_ur: 'نیماٹوڈا' },
          { subtopic_id: 'LEC-ZOO-17_T01_S06', title_en: 'Annelida', title_ur: 'انیلیڈا' },
          { subtopic_id: 'LEC-ZOO-17_T01_S07', title_en: 'Arthropoda', title_ur: 'آرتھروپوڈا' },
          { subtopic_id: 'LEC-ZOO-17_T01_S08', title_en: 'Mollusca', title_ur: 'ملوسکا' },
          { subtopic_id: 'LEC-ZOO-17_T01_S09', title_en: 'Echinodermata', title_ur: 'ایکائینوڈرماٹا' },
          { subtopic_id: 'LEC-ZOO-17_T01_S10', title_en: 'Chordata', title_ur: 'کورڈاٹا' }
        ]
      },
      {
        topic_id: 'LEC-ZOO-17_T02', post_topic_id: 'POST_16_T02',
        title_en: 'Animal Physiology', title_ur: 'حیوانی فزیالوجی',
        subtopics: [
          { subtopic_id: 'LEC-ZOO-17_T02_S01', title_en: 'Digestive System', title_ur: 'نظام ہضم' },
          { subtopic_id: 'LEC-ZOO-17_T02_S02', title_en: 'Circulatory System', title_ur: 'نظام دوران خون' },
          { subtopic_id: 'LEC-ZOO-17_T02_S03', title_en: 'Respiratory System', title_ur: 'نظام تنفس' },
          { subtopic_id: 'LEC-ZOO-17_T02_S04', title_en: 'Excretory System', title_ur: 'نظام اخراج' },
          { subtopic_id: 'LEC-ZOO-17_T02_S05', title_en: 'Nervous System', title_ur: 'نظام اعصاب' },
          { subtopic_id: 'LEC-ZOO-17_T02_S06', title_en: 'Endocrine System', title_ur: 'نظام ہارمون' },
          { subtopic_id: 'LEC-ZOO-17_T02_S07', title_en: 'Reproductive System', title_ur: 'نظام تولید' }
        ]
      },
      {
        topic_id: 'LEC-ZOO-17_T03', post_topic_id: 'POST_16_T03',
        title_en: 'Genetics and Evolution', title_ur: 'وراثت اور ارتقاء',
        subtopics: [
          { subtopic_id: 'LEC-ZOO-17_T03_S01', title_en: 'Mendelian Genetics', title_ur: 'مینڈل کی وراثت' },
          { subtopic_id: 'LEC-ZOO-17_T03_S02', title_en: 'Chromosomal Theory', title_ur: 'کروموسوم نظریہ' },
          { subtopic_id: 'LEC-ZOO-17_T03_S03', title_en: 'DNA / RNA', title_ur: 'DNA / RNA' },
          { subtopic_id: 'LEC-ZOO-17_T03_S04', title_en: 'Gene Expression', title_ur: 'جین اظہار' },
          { subtopic_id: 'LEC-ZOO-17_T03_S05', title_en: 'Lamarck', title_ur: 'لامارک' },
          { subtopic_id: 'LEC-ZOO-17_T03_S06', title_en: 'Darwin', title_ur: 'ڈارون' },
          { subtopic_id: 'LEC-ZOO-17_T03_S07', title_en: 'Modern Synthesis', title_ur: 'جدید ترکیب' },
          { subtopic_id: 'LEC-ZOO-17_T03_S08', title_en: 'Speciation', title_ur: 'نوع سازی' }
        ]
      },
      {
        topic_id: 'LEC-ZOO-17_T04', post_topic_id: 'POST_16_T04',
        title_en: 'Developmental Biology', title_ur: 'نشوونمائی حیاتیات',
        subtopics: [
          { subtopic_id: 'LEC-ZOO-17_T04_S01', title_en: 'Fertilization', title_ur: 'تلقیح' },
          { subtopic_id: 'LEC-ZOO-17_T04_S02', title_en: 'Cleavage', title_ur: 'شق' },
          { subtopic_id: 'LEC-ZOO-17_T04_S03', title_en: 'Blastula Formation', title_ur: 'بلاسٹولا تشکیل' },
          { subtopic_id: 'LEC-ZOO-17_T04_S04', title_en: 'Gastrulation', title_ur: 'گیسٹرولیشن' },
          { subtopic_id: 'LEC-ZOO-17_T04_S05', title_en: 'Organogenesis', title_ur: 'اعضاء سازی' },
          { subtopic_id: 'LEC-ZOO-17_T04_S06', title_en: 'Metamorphosis', title_ur: 'قلب ماہیت' }
        ]
      },
      {
        topic_id: 'LEC-ZOO-17_T05', post_topic_id: 'POST_16_T05',
        title_en: 'Ecology', title_ur: 'ماحولیات',
        subtopics: [
          { subtopic_id: 'LEC-ZOO-17_T05_S01', title_en: 'Population Ecology', title_ur: 'آبادی ماحولیات' },
          { subtopic_id: 'LEC-ZOO-17_T05_S02', title_en: 'Community Ecology', title_ur: 'برادری ماحولیات' },
          { subtopic_id: 'LEC-ZOO-17_T05_S03', title_en: 'Ecosystem Functions', title_ur: 'ماحولیاتی نظام کے وظائف' },
          { subtopic_id: 'LEC-ZOO-17_T05_S04', title_en: 'Biodiversity', title_ur: 'حیاتیاتی تنوع' },
          { subtopic_id: 'LEC-ZOO-17_T05_S05', title_en: 'Conservation', title_ur: 'تحفظ' },
          { subtopic_id: 'LEC-ZOO-17_T05_S06', title_en: 'Environmental Pollution', title_ur: 'ماحولیاتی آلودگی' }
        ]
      },
      {
        topic_id: 'LEC-ZOO-17_T06', post_topic_id: 'POST_16_T06',
        title_en: 'Immunology and Microbiology', title_ur: 'مناعیات اور جرثومیات',
        subtopics: [
          { subtopic_id: 'LEC-ZOO-17_T06_S01', title_en: 'Innate Immunity', title_ur: 'فطری قوت مدافعت' },
          { subtopic_id: 'LEC-ZOO-17_T06_S02', title_en: 'Adaptive Immunity', title_ur: 'حاصل شدہ قوت مدافعت' },
          { subtopic_id: 'LEC-ZOO-17_T06_S03', title_en: 'Immune Cells', title_ur: 'مدافعتی خلیے' },
          { subtopic_id: 'LEC-ZOO-17_T06_S04', title_en: 'Antigen-Antibody Reactions', title_ur: 'اینٹی جن اینٹی باڈی تعامل' },
          { subtopic_id: 'LEC-ZOO-17_T06_S05', title_en: 'Vaccination', title_ur: 'حفاظتی ٹیکہ' },
          { subtopic_id: 'LEC-ZOO-17_T06_S06', title_en: 'Bacteria / Viruses / Fungi', title_ur: 'جراثیم / وائرس / فنگس' },
          { subtopic_id: 'LEC-ZOO-17_T06_S07', title_en: 'Parasitology', title_ur: 'طفیلیات' }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────────────
  // POST 17 — Lecturer Statistics (BS-17)
  // ─────────────────────────────────────────────────────────────────────
  'LEC-STA-17': {
    post_id: 'LEC-STA-17',
    title_en: 'Lecturer Statistics',
    title_ur: 'لیکچرر شماریات',
    grade: 'BS-17',
    language: 'en',
    exam_weight_note: { top_3_topics: ['LEC-STA-17_T04', 'LEC-STA-17_T03', 'LEC-STA-17_T05'] },
    topics: [
      {
        topic_id: 'LEC-STA-17_T01', post_topic_id: 'POST_17_T01',
        title_en: 'Descriptive Statistics', title_ur: 'وصفی شماریات',
        subtopics: [
          { subtopic_id: 'LEC-STA-17_T01_S01', title_en: 'Mean, Median, Mode', title_ur: 'وسط، درمیانی، وتر' },
          { subtopic_id: 'LEC-STA-17_T01_S02', title_en: 'Range', title_ur: 'حد' },
          { subtopic_id: 'LEC-STA-17_T01_S03', title_en: 'Variance', title_ur: 'تفاوت' },
          { subtopic_id: 'LEC-STA-17_T01_S04', title_en: 'Standard Deviation', title_ur: 'معیاری انحراف' },
          { subtopic_id: 'LEC-STA-17_T01_S05', title_en: 'Skewness', title_ur: 'کجی' },
          { subtopic_id: 'LEC-STA-17_T01_S06', title_en: 'Kurtosis', title_ur: 'تحدب' },
          { subtopic_id: 'LEC-STA-17_T01_S07', title_en: 'Graphical Representations', title_ur: 'گرافیکل نمائندگی' }
        ]
      },
      {
        topic_id: 'LEC-STA-17_T02', post_topic_id: 'POST_17_T02',
        title_en: 'Probability Theory', title_ur: 'امکانات کا نظریہ',
        subtopics: [
          { subtopic_id: 'LEC-STA-17_T02_S01', title_en: 'Sample Space', title_ur: 'نمونہ خلا' },
          { subtopic_id: 'LEC-STA-17_T02_S02', title_en: 'Events', title_ur: 'واقعات' },
          { subtopic_id: 'LEC-STA-17_T02_S03', title_en: 'Addition Rule', title_ur: 'اضافہ کا قانون' },
          { subtopic_id: 'LEC-STA-17_T02_S04', title_en: 'Multiplication Rule', title_ur: 'ضرب کا قانون' },
          { subtopic_id: 'LEC-STA-17_T02_S05', title_en: 'Conditional Probability', title_ur: 'مشروط امکان' },
          { subtopic_id: 'LEC-STA-17_T02_S06', title_en: 'Bayes Theorem', title_ur: 'بیز نظریہ' },
          { subtopic_id: 'LEC-STA-17_T02_S07', title_en: 'Permutations and Combinations', title_ur: 'قلب وتبادل' }
        ]
      },
      {
        topic_id: 'LEC-STA-17_T03', post_topic_id: 'POST_17_T03',
        title_en: 'Probability Distributions', title_ur: 'امکانی تقسیم',
        subtopics: [
          { subtopic_id: 'LEC-STA-17_T03_S01', title_en: 'Binomial Distribution', title_ur: 'ثنائی تقسیم' },
          { subtopic_id: 'LEC-STA-17_T03_S02', title_en: 'Poisson Distribution', title_ur: 'پوایسن تقسیم' },
          { subtopic_id: 'LEC-STA-17_T03_S03', title_en: 'Normal Distribution', title_ur: 'معمول تقسیم' },
          { subtopic_id: 'LEC-STA-17_T03_S04', title_en: 'Exponential Distribution', title_ur: 'ایکسپونینشل تقسیم' },
          { subtopic_id: 'LEC-STA-17_T03_S05', title_en: 'Properties and Applications', title_ur: 'خصوصیات اور اطلاقات' }
        ]
      },
      {
        topic_id: 'LEC-STA-17_T04', post_topic_id: 'POST_17_T04',
        title_en: 'Estimation and Hypothesis Testing', title_ur: 'تخمینہ اور مفروضہ جانچ',
        subtopics: [
          { subtopic_id: 'LEC-STA-17_T04_S01', title_en: 'Point Estimation', title_ur: 'نقطہ تخمینہ' },
          { subtopic_id: 'LEC-STA-17_T04_S02', title_en: 'Interval Estimation', title_ur: 'وقفہ تخمینہ' },
          { subtopic_id: 'LEC-STA-17_T04_S03', title_en: 'Confidence Intervals', title_ur: 'اعتماد وقفے' },
          { subtopic_id: 'LEC-STA-17_T04_S04', title_en: 'Null / Alternative Hypothesis', title_ur: 'صفر / متبادل مفروضہ' },
          { subtopic_id: 'LEC-STA-17_T04_S05', title_en: 'Type I / II Errors', title_ur: 'قسم I / II غلطیاں' },
          { subtopic_id: 'LEC-STA-17_T04_S06', title_en: 'Z-test, t-test, Chi-square, F-test', title_ur: 'Z ٹیسٹ، t ٹیسٹ، Chi-square، F ٹیسٹ' }
        ]
      },
      {
        topic_id: 'LEC-STA-17_T05', post_topic_id: 'POST_17_T05',
        title_en: 'Correlation and Regression', title_ur: 'ربط اور انحدار',
        subtopics: [
          { subtopic_id: 'LEC-STA-17_T05_S01', title_en: 'Pearson Coefficient', title_ur: 'پیئرسن گتانک' },
          { subtopic_id: 'LEC-STA-17_T05_S02', title_en: 'Spearman Coefficient', title_ur: 'سپیئرمن گتانک' },
          { subtopic_id: 'LEC-STA-17_T05_S03', title_en: 'Simple Linear Regression', title_ur: 'سادہ خطی انحدار' },
          { subtopic_id: 'LEC-STA-17_T05_S04', title_en: 'Least Squares', title_ur: 'کم از کم مربعات' },
          { subtopic_id: 'LEC-STA-17_T05_S05', title_en: 'Multiple Regression Basics', title_ur: 'متعدد انحدار کی بنیادیں' },
          { subtopic_id: 'LEC-STA-17_T05_S06', title_en: 'Interpretation', title_ur: 'تعبیر' }
        ]
      },
      {
        topic_id: 'LEC-STA-17_T06', post_topic_id: 'POST_17_T06',
        title_en: 'Analysis of Variance', title_ur: 'تفاوت کا تجزیہ',
        subtopics: [
          { subtopic_id: 'LEC-STA-17_T06_S01', title_en: 'One-way ANOVA', title_ur: 'یک طرفہ ANOVA' },
          { subtopic_id: 'LEC-STA-17_T06_S02', title_en: 'Two-way ANOVA', title_ur: 'دو طرفہ ANOVA' },
          { subtopic_id: 'LEC-STA-17_T06_S03', title_en: 'F-distribution', title_ur: 'F تقسیم' },
          { subtopic_id: 'LEC-STA-17_T06_S04', title_en: 'Assumptions', title_ur: 'مفروضات' },
          { subtopic_id: 'LEC-STA-17_T06_S05', title_en: 'Post-hoc Tests', title_ur: 'بعد از ہاک ٹیسٹ' }
        ]
      },
      {
        topic_id: 'LEC-STA-17_T07', post_topic_id: 'POST_17_T07',
        title_en: 'Time Series and Index Numbers', title_ur: 'وقت سلسلہ اور اشاریہ نمبر',
        subtopics: [
          { subtopic_id: 'LEC-STA-17_T07_S01', title_en: 'Time Series Components', title_ur: 'وقت سلسلے کے اجزاء' },
          { subtopic_id: 'LEC-STA-17_T07_S02', title_en: 'Trend Analysis', title_ur: 'رجحان تجزیہ' },
          { subtopic_id: 'LEC-STA-17_T07_S03', title_en: 'Seasonal Variation', title_ur: 'موسمی تغیر' },
          { subtopic_id: 'LEC-STA-17_T07_S04', title_en: 'Forecasting Methods', title_ur: 'پیش گوئی کے طریقے' },
          { subtopic_id: 'LEC-STA-17_T07_S05', title_en: 'Laspeyres / Paasche Index', title_ur: 'لاسپیئر / پاشے اشاریہ' },
          { subtopic_id: 'LEC-STA-17_T07_S06', title_en: 'CPI', title_ur: 'صارف قیمت اشاریہ' }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────────────
  // POST 18 — Lecturer Geography (BS-17)
  // ─────────────────────────────────────────────────────────────────────
  'LEC-GEO-17': {
    post_id: 'LEC-GEO-17',
    title_en: 'Lecturer Geography',
    title_ur: 'لیکچرر جغرافیہ',
    grade: 'BS-17',
    language: 'en',
    exam_weight_note: { top_3_topics: ['LEC-GEO-17_T01', 'LEC-GEO-17_T02', 'LEC-GEO-17_T04'] },
    topics: [
      {
        topic_id: 'LEC-GEO-17_T01', post_topic_id: 'POST_18_T01',
        title_en: 'Physical Geography', title_ur: 'طبعی جغرافیہ',
        subtopics: [
          { subtopic_id: 'LEC-GEO-17_T01_S01', title_en: "Earth's Interior", title_ur: 'زمین کا اندرونی حصہ' },
          { subtopic_id: 'LEC-GEO-17_T01_S02', title_en: 'Plate Tectonics', title_ur: 'تختہ حرکیات' },
          { subtopic_id: 'LEC-GEO-17_T01_S03', title_en: 'Landforms', title_ur: 'خشکی کی اشکال' },
          { subtopic_id: 'LEC-GEO-17_T01_S04', title_en: 'Atmosphere Layers', title_ur: 'فضا کی تہیں' },
          { subtopic_id: 'LEC-GEO-17_T01_S05', title_en: 'Weather Elements', title_ur: 'موسمی عناصر' },
          { subtopic_id: 'LEC-GEO-17_T01_S06', title_en: 'Hydrosphere', title_ur: 'آبی کرہ' },
          { subtopic_id: 'LEC-GEO-17_T01_S07', title_en: 'Soil Formation', title_ur: 'مٹی کی تشکیل' }
        ]
      },
      {
        topic_id: 'LEC-GEO-17_T02', post_topic_id: 'POST_18_T02',
        title_en: 'Climatology', title_ur: 'علم موسمیات',
        subtopics: [
          { subtopic_id: 'LEC-GEO-17_T02_S01', title_en: 'Temperature', title_ur: 'درجہ حرارت' },
          { subtopic_id: 'LEC-GEO-17_T02_S02', title_en: 'Pressure', title_ur: 'دباؤ' },
          { subtopic_id: 'LEC-GEO-17_T02_S03', title_en: 'Wind Systems', title_ur: 'ہوا کے نظام' },
          { subtopic_id: 'LEC-GEO-17_T02_S04', title_en: 'Precipitation', title_ur: 'بارش' },
          { subtopic_id: 'LEC-GEO-17_T02_S05', title_en: 'Climate Types', title_ur: 'موسم کی اقسام' },
          { subtopic_id: 'LEC-GEO-17_T02_S06', title_en: 'Monsoon', title_ur: 'مون سون' },
          { subtopic_id: 'LEC-GEO-17_T02_S07', title_en: 'Climate Change and Global Warming', title_ur: 'موسمیاتی تبدیلی اور عالمی تپش' }
        ]
      },
      {
        topic_id: 'LEC-GEO-17_T03', post_topic_id: 'POST_18_T03',
        title_en: 'Human Geography', title_ur: 'انسانی جغرافیہ',
        subtopics: [
          { subtopic_id: 'LEC-GEO-17_T03_S01', title_en: 'Population Growth', title_ur: 'آبادی میں اضافہ' },
          { subtopic_id: 'LEC-GEO-17_T03_S02', title_en: 'Distribution', title_ur: 'تقسیم' },
          { subtopic_id: 'LEC-GEO-17_T03_S03', title_en: 'Migration', title_ur: 'نقل مکانی' },
          { subtopic_id: 'LEC-GEO-17_T03_S04', title_en: 'Urbanization', title_ur: 'شہری کاری' },
          { subtopic_id: 'LEC-GEO-17_T03_S05', title_en: 'Economic Activities', title_ur: 'اقتصادی سرگرمیاں' },
          { subtopic_id: 'LEC-GEO-17_T03_S06', title_en: 'Settlement Patterns', title_ur: 'آبادکاری کے نمونے' },
          { subtopic_id: 'LEC-GEO-17_T03_S07', title_en: 'Land Use', title_ur: 'زمین کا استعمال' }
        ]
      },
      {
        topic_id: 'LEC-GEO-17_T04', post_topic_id: 'POST_18_T04',
        title_en: 'Regional Geography', title_ur: 'علاقائی جغرافیہ',
        subtopics: [
          { subtopic_id: 'LEC-GEO-17_T04_S01', title_en: 'Asia Geography', title_ur: 'ایشیا کا جغرافیہ' },
          { subtopic_id: 'LEC-GEO-17_T04_S02', title_en: 'Pakistan Geography', title_ur: 'پاکستان کا جغرافیہ' },
          { subtopic_id: 'LEC-GEO-17_T04_S03', title_en: 'Kashmir Geography', title_ur: 'کشمیر کا جغرافیہ' },
          { subtopic_id: 'LEC-GEO-17_T04_S04', title_en: 'Africa', title_ur: 'افریقہ' },
          { subtopic_id: 'LEC-GEO-17_T04_S05', title_en: 'Europe', title_ur: 'یورپ' },
          { subtopic_id: 'LEC-GEO-17_T04_S06', title_en: 'Americas Overview', title_ur: 'امریکہ کا جائزہ' }
        ]
      },
      {
        topic_id: 'LEC-GEO-17_T05', post_topic_id: 'POST_18_T05',
        title_en: 'Geographic Techniques', title_ur: 'جغرافیائی تکنیک',
        subtopics: [
          { subtopic_id: 'LEC-GEO-17_T05_S01', title_en: 'Map Types', title_ur: 'نقشوں کی اقسام' },
          { subtopic_id: 'LEC-GEO-17_T05_S02', title_en: 'Map Scale', title_ur: 'نقشے کا پیمانہ' },
          { subtopic_id: 'LEC-GEO-17_T05_S03', title_en: 'Map Projection', title_ur: 'نقشے کا تخمینہ' },
          { subtopic_id: 'LEC-GEO-17_T05_S04', title_en: 'GPS and GIS', title_ur: 'GPS اور GIS' },
          { subtopic_id: 'LEC-GEO-17_T05_S05', title_en: 'Remote Sensing', title_ur: 'ریموٹ سینسنگ' },
          { subtopic_id: 'LEC-GEO-17_T05_S06', title_en: 'Cartography Basics', title_ur: 'نقشہ نویسی کی بنیادیں' }
        ]
      },
      {
        topic_id: 'LEC-GEO-17_T06', post_topic_id: 'POST_18_T06',
        title_en: 'Environmental Geography', title_ur: 'ماحولیاتی جغرافیہ',
        subtopics: [
          { subtopic_id: 'LEC-GEO-17_T06_S01', title_en: 'Natural Hazards', title_ur: 'قدرتی آفات' },
          { subtopic_id: 'LEC-GEO-17_T06_S02', title_en: 'Floods', title_ur: 'سیلاب' },
          { subtopic_id: 'LEC-GEO-17_T06_S03', title_en: 'Earthquakes', title_ur: 'زلزلے' },
          { subtopic_id: 'LEC-GEO-17_T06_S04', title_en: 'Landslides', title_ur: 'زمین کھسکنا' },
          { subtopic_id: 'LEC-GEO-17_T06_S05', title_en: 'Deforestation', title_ur: 'جنگلات کی کٹائی' },
          { subtopic_id: 'LEC-GEO-17_T06_S06', title_en: 'Desertification', title_ur: 'بیابانی' },
          { subtopic_id: 'LEC-GEO-17_T06_S07', title_en: 'Pollution Types', title_ur: 'آلودگی کی اقسام' },
          { subtopic_id: 'LEC-GEO-17_T06_S08', title_en: 'Sustainable Development', title_ur: 'پائیدار ترقی' }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────────────
  // POST 19 — Lecturer Commerce (BS-17)
  // ─────────────────────────────────────────────────────────────────────
  'LEC-COM-17': {
    post_id: 'LEC-COM-17',
    title_en: 'Lecturer Commerce',
    title_ur: 'لیکچرر تجارت',
    grade: 'BS-17',
    language: 'en',
    exam_weight_note: { top_3_topics: ['LEC-COM-17_T02', 'LEC-COM-17_T03', 'LEC-COM-17_T04'] },
    topics: [
      {
        topic_id: 'LEC-COM-17_T01', post_topic_id: 'POST_19_T01',
        title_en: 'Business Organization', title_ur: 'کاروباری تنظیم',
        subtopics: [
          { subtopic_id: 'LEC-COM-17_T01_S01', title_en: 'Sole Proprietorship', title_ur: 'واحد ملکیت' },
          { subtopic_id: 'LEC-COM-17_T01_S02', title_en: 'Partnership', title_ur: 'شراکت داری' },
          { subtopic_id: 'LEC-COM-17_T01_S03', title_en: 'Joint Stock Company', title_ur: 'مشترک حصص کمپنی' },
          { subtopic_id: 'LEC-COM-17_T01_S04', title_en: 'Cooperative Societies', title_ur: 'تعاون آمیز معاشرے' },
          { subtopic_id: 'LEC-COM-17_T01_S05', title_en: 'Business Structures', title_ur: 'کاروباری ڈھانچے' },
          { subtopic_id: 'LEC-COM-17_T01_S06', title_en: 'Types of Ownership', title_ur: 'ملکیت کی اقسام' }
        ]
      },
      {
        topic_id: 'LEC-COM-17_T02', post_topic_id: 'POST_19_T02',
        title_en: 'Accounting', title_ur: 'اکاؤنٹنگ',
        subtopics: [
          { subtopic_id: 'LEC-COM-17_T02_S01', title_en: 'Accounting Principles', title_ur: 'اکاؤنٹنگ کے اصول' },
          { subtopic_id: 'LEC-COM-17_T02_S02', title_en: 'Double-entry System', title_ur: 'ڈبل انٹری سسٹم' },
          { subtopic_id: 'LEC-COM-17_T02_S03', title_en: 'Journal Entries', title_ur: 'جرنل اندراجات' },
          { subtopic_id: 'LEC-COM-17_T02_S04', title_en: 'Ledger', title_ur: 'لیجر' },
          { subtopic_id: 'LEC-COM-17_T02_S05', title_en: 'Trial Balance', title_ur: 'ٹرائل بیلنس' },
          { subtopic_id: 'LEC-COM-17_T02_S06', title_en: 'Profit / Loss Account', title_ur: 'نفع / نقصان کھاتہ' },
          { subtopic_id: 'LEC-COM-17_T02_S07', title_en: 'Balance Sheet', title_ur: 'بیلنس شیٹ' },
          { subtopic_id: 'LEC-COM-17_T02_S08', title_en: 'Financial Ratios', title_ur: 'مالیاتی تناسب' }
        ]
      },
      {
        topic_id: 'LEC-COM-17_T03', post_topic_id: 'POST_19_T03',
        title_en: 'Marketing', title_ur: 'مارکیٹنگ',
        subtopics: [
          { subtopic_id: 'LEC-COM-17_T03_S01', title_en: 'Marketing Concepts', title_ur: 'مارکیٹنگ کے تصورات' },
          { subtopic_id: 'LEC-COM-17_T03_S02', title_en: 'Market Research', title_ur: 'بازار تحقیق' },
          { subtopic_id: 'LEC-COM-17_T03_S03', title_en: 'Consumer Behavior', title_ur: 'صارف رویہ' },
          { subtopic_id: 'LEC-COM-17_T03_S04', title_en: '4Ps (Product / Price / Place / Promotion)', title_ur: '4Ps (مصنوعات / قیمت / مقام / ترویج)' },
          { subtopic_id: 'LEC-COM-17_T03_S05', title_en: 'Sales Techniques', title_ur: 'فروخت کی تکنیک' },
          { subtopic_id: 'LEC-COM-17_T03_S06', title_en: 'Distribution Channels', title_ur: 'تقسیم کے چینل' }
        ]
      },
      {
        topic_id: 'LEC-COM-17_T04', post_topic_id: 'POST_19_T04',
        title_en: 'Banking and Insurance', title_ur: 'بینکنگ اور بیمہ',
        subtopics: [
          { subtopic_id: 'LEC-COM-17_T04_S01', title_en: 'Types of Banks', title_ur: 'بینکوں کی اقسام' },
          { subtopic_id: 'LEC-COM-17_T04_S02', title_en: 'Banking Services', title_ur: 'بینکنگ خدمات' },
          { subtopic_id: 'LEC-COM-17_T04_S03', title_en: 'Central Bank Functions', title_ur: 'مرکزی بینک کے وظائف' },
          { subtopic_id: 'LEC-COM-17_T04_S04', title_en: 'Types of Insurance', title_ur: 'بیمے کی اقسام' },
          { subtopic_id: 'LEC-COM-17_T04_S05', title_en: 'Risk Management Principles', title_ur: 'خطرہ انتظام کے اصول' }
        ]
      },
      {
        topic_id: 'LEC-COM-17_T05', post_topic_id: 'POST_19_T05',
        title_en: 'Business Law', title_ur: 'تجارتی قانون',
        subtopics: [
          { subtopic_id: 'LEC-COM-17_T05_S01', title_en: 'Contract Law', title_ur: 'معاہدے کا قانون' },
          { subtopic_id: 'LEC-COM-17_T05_S02', title_en: 'Company Law', title_ur: 'کمپنی کا قانون' },
          { subtopic_id: 'LEC-COM-17_T05_S03', title_en: 'Consumer Protection', title_ur: 'صارف تحفظ' },
          { subtopic_id: 'LEC-COM-17_T05_S04', title_en: 'Business Ethics', title_ur: 'تجارتی اخلاقیات' },
          { subtopic_id: 'LEC-COM-17_T05_S05', title_en: 'Corporate Social Responsibility', title_ur: 'کارپوریٹ سماجی ذمہ داری' }
        ]
      },
      {
        topic_id: 'LEC-COM-17_T06', post_topic_id: 'POST_19_T06',
        title_en: 'International Business', title_ur: 'بین الاقوامی کاروبار',
        subtopics: [
          { subtopic_id: 'LEC-COM-17_T06_S01', title_en: 'Globalization', title_ur: 'عالمگیریت' },
          { subtopic_id: 'LEC-COM-17_T06_S02', title_en: 'Comparative Advantage', title_ur: 'تقابلی فائدہ' },
          { subtopic_id: 'LEC-COM-17_T06_S03', title_en: 'Export-Import Procedures', title_ur: 'برآمد-درآمد طریقہ کار' },
          { subtopic_id: 'LEC-COM-17_T06_S04', title_en: 'Foreign Exchange', title_ur: 'غیر ملکی زر مبادلہ' },
          { subtopic_id: 'LEC-COM-17_T06_S05', title_en: 'Trade Policies', title_ur: 'تجارتی پالیسیاں' },
          { subtopic_id: 'LEC-COM-17_T06_S06', title_en: 'WTO / IMF / World Bank', title_ur: 'ڈبلیو ٹی او / آئی ایم ایف / عالمی بینک' }
        ]
      },
      {
        topic_id: 'LEC-COM-17_T07', post_topic_id: 'POST_19_T07',
        title_en: 'Management and Entrepreneurship', title_ur: 'انتظام اور کاروباریت',
        subtopics: [
          { subtopic_id: 'LEC-COM-17_T07_S01', title_en: 'Planning', title_ur: 'منصوبہ بندی' },
          { subtopic_id: 'LEC-COM-17_T07_S02', title_en: 'Organizing', title_ur: 'تنظیم' },
          { subtopic_id: 'LEC-COM-17_T07_S03', title_en: 'Leading', title_ur: 'قیادت' },
          { subtopic_id: 'LEC-COM-17_T07_S04', title_en: 'Controlling', title_ur: 'کنٹرول' },
          { subtopic_id: 'LEC-COM-17_T07_S05', title_en: 'Entrepreneurship Development', title_ur: 'کاروباریت کی ترقی' },
          { subtopic_id: 'LEC-COM-17_T07_S06', title_en: 'Project Management', title_ur: 'منصوبہ انتظام' },
          { subtopic_id: 'LEC-COM-17_T07_S07', title_en: 'Decision Making', title_ur: 'فیصلہ سازی' }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────────────
  // POST 20 — Lecturer Biology (BS-17)
  // ─────────────────────────────────────────────────────────────────────
  'LEC-BIO-17': {
    post_id: 'LEC-BIO-17',
    title_en: 'Lecturer Biology',
    title_ur: 'لیکچرر حیاتیات',
    grade: 'BS-17',
    language: 'en',
    exam_weight_note: { top_3_topics: ['LEC-BIO-17_T03', 'LEC-BIO-17_T01', 'LEC-BIO-17_T05'] },
    topics: [
      {
        topic_id: 'LEC-BIO-17_T01', post_topic_id: 'POST_20_T01',
        title_en: 'Cell Biology', title_ur: 'خلیاتی حیاتیات',
        subtopics: [
          { subtopic_id: 'LEC-BIO-17_T01_S01', title_en: 'Prokaryotic vs Eukaryotic Cells', title_ur: 'پروکیریوٹ بمقابلہ یوکیریوٹ خلیے' },
          { subtopic_id: 'LEC-BIO-17_T01_S02', title_en: 'Cell Organelles', title_ur: 'خلیاتی اعضا' },
          { subtopic_id: 'LEC-BIO-17_T01_S03', title_en: 'Mitosis', title_ur: 'مائٹوسس' },
          { subtopic_id: 'LEC-BIO-17_T01_S04', title_en: 'Meiosis', title_ur: 'میوسس' },
          { subtopic_id: 'LEC-BIO-17_T01_S05', title_en: 'Cell Cycle Regulation', title_ur: 'خلیاتی چکر کا ضابطہ' }
        ]
      },
      {
        topic_id: 'LEC-BIO-17_T02', post_topic_id: 'POST_20_T02',
        title_en: 'Biochemistry', title_ur: 'حیاتی کیمیا',
        subtopics: [
          { subtopic_id: 'LEC-BIO-17_T02_S01', title_en: 'Carbohydrates', title_ur: 'نشاستہ' },
          { subtopic_id: 'LEC-BIO-17_T02_S02', title_en: 'Proteins', title_ur: 'لحمیات' },
          { subtopic_id: 'LEC-BIO-17_T02_S03', title_en: 'Lipids', title_ur: 'چکنائی' },
          { subtopic_id: 'LEC-BIO-17_T02_S04', title_en: 'Nucleic Acids', title_ur: 'نیوکلک ایسڈ' },
          { subtopic_id: 'LEC-BIO-17_T02_S05', title_en: 'Enzymes', title_ur: 'خامرے' },
          { subtopic_id: 'LEC-BIO-17_T02_S06', title_en: 'Metabolic Pathways', title_ur: 'میٹابولک راستے' }
        ]
      },
      {
        topic_id: 'LEC-BIO-17_T03', post_topic_id: 'POST_20_T03',
        title_en: 'Genetics', title_ur: 'وراثت',
        subtopics: [
          { subtopic_id: 'LEC-BIO-17_T03_S01', title_en: 'Mendelian Laws', title_ur: 'مینڈل کے قوانین' },
          { subtopic_id: 'LEC-BIO-17_T03_S02', title_en: 'Chromosomal Theory', title_ur: 'کروموسوم نظریہ' },
          { subtopic_id: 'LEC-BIO-17_T03_S03', title_en: 'DNA Replication', title_ur: 'DNA نقل' },
          { subtopic_id: 'LEC-BIO-17_T03_S04', title_en: 'Transcription', title_ur: 'نقل نویسی' },
          { subtopic_id: 'LEC-BIO-17_T03_S05', title_en: 'Translation', title_ur: 'ترجمہ' },
          { subtopic_id: 'LEC-BIO-17_T03_S06', title_en: 'Gene Regulation', title_ur: 'جین ضابطہ' },
          { subtopic_id: 'LEC-BIO-17_T03_S07', title_en: 'Mutations', title_ur: 'تغیرات' }
        ]
      },
      {
        topic_id: 'LEC-BIO-17_T04', post_topic_id: 'POST_20_T04',
        title_en: 'Evolution and Diversity', title_ur: 'ارتقاء اور تنوع',
        subtopics: [
          { subtopic_id: 'LEC-BIO-17_T04_S01', title_en: 'Natural Selection', title_ur: 'قدرتی انتخاب' },
          { subtopic_id: 'LEC-BIO-17_T04_S02', title_en: 'Speciation', title_ur: 'نوع سازی' },
          { subtopic_id: 'LEC-BIO-17_T04_S03', title_en: 'Phylogeny', title_ur: 'شجرہ حیات' },
          { subtopic_id: 'LEC-BIO-17_T04_S04', title_en: 'Fossil Evidence', title_ur: 'قدیم آثار' },
          { subtopic_id: 'LEC-BIO-17_T04_S05', title_en: 'Comparative Anatomy', title_ur: 'تقابلی تشریح' },
          { subtopic_id: 'LEC-BIO-17_T04_S06', title_en: 'Molecular Evolution', title_ur: 'سالماتی ارتقاء' }
        ]
      },
      {
        topic_id: 'LEC-BIO-17_T05', post_topic_id: 'POST_20_T05',
        title_en: 'Ecology', title_ur: 'ماحولیات',
        subtopics: [
          { subtopic_id: 'LEC-BIO-17_T05_S01', title_en: 'Ecosystems', title_ur: 'ماحولیاتی نظام' },
          { subtopic_id: 'LEC-BIO-17_T05_S02', title_en: 'Biomes', title_ur: 'حیاتی علاقے' },
          { subtopic_id: 'LEC-BIO-17_T05_S03', title_en: 'Food Webs', title_ur: 'غذائی جال' },
          { subtopic_id: 'LEC-BIO-17_T05_S04', title_en: 'Energy Flow', title_ur: 'توانائی کا بہاؤ' },
          { subtopic_id: 'LEC-BIO-17_T05_S05', title_en: 'Nutrient Cycles', title_ur: 'غذائی چکر' },
          { subtopic_id: 'LEC-BIO-17_T05_S06', title_en: 'Biodiversity', title_ur: 'حیاتیاتی تنوع' },
          { subtopic_id: 'LEC-BIO-17_T05_S07', title_en: 'Conservation Biology', title_ur: 'تحفظ حیاتیات' },
          { subtopic_id: 'LEC-BIO-17_T05_S08', title_en: 'Environmental Issues', title_ur: 'ماحولیاتی مسائل' }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────────────
  // POST 21 — Senior Auditor (BS-16)
  // ─────────────────────────────────────────────────────────────────────
  'SA-16': {
    post_id: 'SA-16',
    title_en: 'Senior Auditor',
    title_ur: 'سینئر آڈیٹر',
    grade: 'BS-16',
    language: 'en',
    exam_weight_note: { top_3_topics: ['SA-16_T03', 'SA-16_T01', 'SA-16_T05'] },
    topics: [
      {
        topic_id: 'SA-16_T01', post_topic_id: 'POST_21_T01',
        title_en: 'Accounting Principles', title_ur: 'اکاؤنٹنگ کے اصول',
        subtopics: [
          { subtopic_id: 'SA-16_T01_S01', title_en: 'Accounting Concepts', title_ur: 'اکاؤنٹنگ کے تصورات' },
          { subtopic_id: 'SA-16_T01_S02', title_en: 'Double-entry System', title_ur: 'ڈبل انٹری سسٹم' },
          { subtopic_id: 'SA-16_T01_S03', title_en: 'Journal / Ledger / Trial Balance', title_ur: 'جرنل / لیجر / ٹرائل بیلنس' },
          { subtopic_id: 'SA-16_T01_S04', title_en: 'Cash Book', title_ur: 'کیش بک' },
          { subtopic_id: 'SA-16_T01_S05', title_en: 'Bank Reconciliation', title_ur: 'بینک مطابقت' }
        ]
      },
      {
        topic_id: 'SA-16_T02', post_topic_id: 'POST_21_T02',
        title_en: 'Financial Management', title_ur: 'مالیاتی انتظام',
        subtopics: [
          { subtopic_id: 'SA-16_T02_S01', title_en: 'Budget Preparation', title_ur: 'بجٹ کی تیاری' },
          { subtopic_id: 'SA-16_T02_S02', title_en: 'Revenue and Expenditure', title_ur: 'آمدنی اور اخراجات' },
          { subtopic_id: 'SA-16_T02_S03', title_en: 'Budget Classification', title_ur: 'بجٹ کی درجہ بندی' },
          { subtopic_id: 'SA-16_T02_S04', title_en: 'Budget Analysis', title_ur: 'بجٹ کا تجزیہ' },
          { subtopic_id: 'SA-16_T02_S05', title_en: 'Financial Planning', title_ur: 'مالیاتی منصوبہ بندی' },
          { subtopic_id: 'SA-16_T02_S06', title_en: 'Cost Accounting', title_ur: 'لاگت اکاؤنٹنگ' }
        ]
      },
      {
        topic_id: 'SA-16_T03', post_topic_id: 'POST_21_T03',
        title_en: 'Audit Procedures', title_ur: 'آڈیٹ کے طریقہ کار',
        subtopics: [
          { subtopic_id: 'SA-16_T03_S01', title_en: 'Internal Controls', title_ur: 'اندرونی کنٹرول' },
          { subtopic_id: 'SA-16_T03_S02', title_en: 'Verification of Accounts', title_ur: 'اکاؤنٹس کی تصدیق' },
          { subtopic_id: 'SA-16_T03_S03', title_en: 'Compliance Checking', title_ur: 'تعمیل کی جانچ' },
          { subtopic_id: 'SA-16_T03_S04', title_en: 'Audit Objections', title_ur: 'آڈیٹ اعتراضات' },
          { subtopic_id: 'SA-16_T03_S05', title_en: 'Settlement of Objections', title_ur: 'اعتراضات کا ازالہ' },
          { subtopic_id: 'SA-16_T03_S06', title_en: 'Documentation', title_ur: 'دستاویزات' }
        ]
      },
      {
        topic_id: 'SA-16_T04', post_topic_id: 'POST_21_T04',
        title_en: 'Adjustment and Depreciation', title_ur: 'ایڈجسٹمنٹ اور ڈیپریشیئیشن',
        subtopics: [
          { subtopic_id: 'SA-16_T04_S01', title_en: 'Accruals', title_ur: 'جمع شدہ' },
          { subtopic_id: 'SA-16_T04_S02', title_en: 'Prepayments', title_ur: 'پیشگی ادائیگیاں' },
          { subtopic_id: 'SA-16_T04_S03', title_en: 'Straight Line Depreciation', title_ur: 'سیدھی لائن ڈیپریشیئیشن' },
          { subtopic_id: 'SA-16_T04_S04', title_en: 'Reducing Balance Method', title_ur: 'کم ہوتی بیلنس کا طریقہ' },
          { subtopic_id: 'SA-16_T04_S05', title_en: 'Asset Valuation', title_ur: 'اثاثہ جات کی قیمت' },
          { subtopic_id: 'SA-16_T04_S06', title_en: 'Write-offs', title_ur: 'رائٹ آف' }
        ]
      },
      {
        topic_id: 'SA-16_T05', post_topic_id: 'POST_21_T05',
        title_en: 'Public Procurement Rules (AJK)', title_ur: 'پبلک پروکیورمنٹ رولز (آزاد جموں و کشمیر)',
        subtopics: [
          { subtopic_id: 'SA-16_T05_S01', title_en: 'AJ&K Procurement Rules 2017', title_ur: 'آزاد جموں و کشمیر پروکیورمنٹ رولز 2017' },
          { subtopic_id: 'SA-16_T05_S02', title_en: 'Tendering Process', title_ur: 'ٹینڈرنگ کا عمل' },
          { subtopic_id: 'SA-16_T05_S03', title_en: 'Procurement Procedures', title_ur: 'پروکیورمنٹ کے طریقہ کار' },
          { subtopic_id: 'SA-16_T05_S04', title_en: 'Consultancy Services Regulations 2018', title_ur: 'کنسلٹنسی سروسز ریگولیشنز 2018' },
          { subtopic_id: 'SA-16_T05_S05', title_en: 'Contract Awarding and Evaluation', title_ur: 'معاہدے کی منظوری اور تشخیص' }
        ]
      },
      {
        topic_id: 'SA-16_T06', post_topic_id: 'POST_21_T06',
        title_en: 'Pension and HR Finance', title_ur: 'پنشن اور انسانی وسائل کی مالیات',
        subtopics: [
          { subtopic_id: 'SA-16_T06_S01', title_en: 'Pension Rules', title_ur: 'پنشن کے اصول' },
          { subtopic_id: 'SA-16_T06_S02', title_en: 'Pension Calculation', title_ur: 'پنشن کا حساب' },
          { subtopic_id: 'SA-16_T06_S03', title_en: 'Documentation Requirements', title_ur: 'دستاویزات کی ضروریات' },
          { subtopic_id: 'SA-16_T06_S04', title_en: 'Gratuity', title_ur: 'گریجویٹی' },
          { subtopic_id: 'SA-16_T06_S05', title_en: 'Leave Encashment', title_ur: 'چھٹی کا نقد رقم میں تبدیل' },
          { subtopic_id: 'SA-16_T06_S06', title_en: 'Group Insurance', title_ur: 'گروپ انشورنس' }
        ]
      },
      {
        topic_id: 'SA-16_T07', post_topic_id: 'POST_21_T07',
        title_en: 'IT and Computer Skills', title_ur: 'آئی ٹی اور کمپیوٹر مہارتیں',
        subtopics: [
          { subtopic_id: 'SA-16_T07_S01', title_en: 'MS Word', title_ur: 'ایم ایس ورڈ' },
          { subtopic_id: 'SA-16_T07_S02', title_en: 'MS Excel for Accounting', title_ur: 'اکاؤنٹنگ کے لیے ایم ایس ایکسل' },
          { subtopic_id: 'SA-16_T07_S03', title_en: 'MS PowerPoint', title_ur: 'ایم ایس پاور پوائنٹ' },
          { subtopic_id: 'SA-16_T07_S04', title_en: 'Accounting Software Basics', title_ur: 'اکاؤنٹنگ سافٹ ویئر کی بنیادیں' },
          { subtopic_id: 'SA-16_T07_S05', title_en: 'Data Entry', title_ur: 'ڈیٹا اندراج' },
          { subtopic_id: 'SA-16_T07_S06', title_en: 'Spreadsheet Formulas', title_ur: 'اسپریڈشیٹ فارمولے' }
        ]
      },
      {
        topic_id: 'SA-16_T08', post_topic_id: 'POST_21_T08',
        title_en: 'English Grammar (Exam Section)', title_ur: 'انگریزی گرامر (امتحانی سیکشن)',
        subtopics: [
          { subtopic_id: 'SA-16_T08_S01', title_en: 'Parts of Speech', title_ur: 'تقریر کے حصے' },
          { subtopic_id: 'SA-16_T08_S02', title_en: 'Tenses', title_ur: 'ٹینس' },
          { subtopic_id: 'SA-16_T08_S03', title_en: 'Active / Passive Voice', title_ur: 'فاعلی / مفعولی صیغہ' },
          { subtopic_id: 'SA-16_T08_S04', title_en: 'Direct / Indirect Speech', title_ur: 'براہ راست / بالواسطہ گفتگو' },
          { subtopic_id: 'SA-16_T08_S05', title_en: 'Sentence Correction', title_ur: 'جملے کی اصلاح' },
          { subtopic_id: 'SA-16_T08_S06', title_en: 'Common Errors', title_ur: 'عام غلطیاں' }
        ]
      }
    ]
  }
};

// Helper function to get curriculum data for a profession
export function getCurriculum(professionId) {
  return CURRICULUM_DATA[professionId] || null;
}

// Helper function to get topics for a profession
export function getTopics(professionId) {
  const curriculum = CURRICULUM_DATA[professionId];
  return curriculum?.topics || [];
}

// Helper function to get a specific topic
export function getTopic(professionId, topicId) {
  const curriculum = CURRICULUM_DATA[professionId];
  return curriculum?.topics.find(t => t.topic_id === topicId) || null;
}

// Helper function to get subtopics for a topic
export function getSubtopics(professionId, topicId) {
  const topic = getTopic(professionId, topicId);
  return topic?.subtopics || [];
}

// Helper function to get a specific subtopic
export function getSubtopic(professionId, topicId, subtopicId) {
  const topic = getTopic(professionId, topicId);
  return topic?.subtopics.find(s => s.subtopic_id === subtopicId) || null;
}

// Get all profession IDs that have curriculum data
export function getCurriculumProfessionIds() {
  return Object.keys(CURRICULUM_DATA);
}
