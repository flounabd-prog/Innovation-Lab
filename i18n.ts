
export type Language = 'ar' | 'en';

export const translations = {
  ar: {
    title: "مختبر الإبداع",
    subtitle: "منصة حل المشكلات الذكية",
    placeholder: "اكتب التحدي الذي يواجهك هنا... (مثال: كيف يمكننا تقليل هدر الطعام في المطعم؟)",
    startBtn: "ابدأ رحلة الابتكار",
    examplesTitle: "أمثلة ملهمة:",
    loadingSteps: [
      "تفكيك التحدي...",
      "اختيار المنهجية...",
      "تفكير إبداعي...",
      "خطة التنفيذ..."
    ],
    newChallenge: "تحدي جديد",
    copyAll: "نسخ جميع الحلول",
    copyAllShort: "نسخ الكل",
    detectedChallenge: "التحدي المكتشف",
    usedTechnique: "المنهجية المستخدمة",
    category: "التصنيف:",
    all: "الكل",
    favorites: "المفضلة",
    impact: "الأثر",
    feasibility: "الجدوى",
    nextStep: "الخطوة القادمة",
    copySuccess: "تم نسخ الحل بنجاح",
    copyAllSuccess: "تم نسخ جميع الحلول",
    error: "عذراً، حدث خطأ ما في التحليل. حاول مرة أخرى",
    inputError: "يرجى كتابة التحدي أولاً",
    footerText: "صنع بكل ❤️ لمجتمع المبدعين",
    switchLanguage: "English",
    dir: "rtl"
  },
  en: {
    title: "Innovation Lab",
    subtitle: "Smart Problem Solving Platform",
    placeholder: "Type your challenge here... (e.g., How can we reduce food waste in the restaurant?)",
    startBtn: "Start Innovation Journey",
    examplesTitle: "Inspiring Examples:",
    loadingSteps: [
      "Deconstructing challenge...",
      "Selecting methodology...",
      "Creative thinking...",
      "Execution plan..."
    ],
    newChallenge: "New Challenge",
    copyAll: "Copy All Solutions",
    copyAllShort: "Copy All",
    detectedChallenge: "Detected Challenge",
    usedTechnique: "Methodology Used",
    category: "Category:",
    all: "All",
    favorites: "Favorites",
    impact: "Impact",
    feasibility: "Feasibility",
    nextStep: "Next Step",
    copySuccess: "Solution copied successfully",
    copyAllSuccess: "All solutions copied",
    error: "Sorry, an error occurred during analysis. Please try again",
    inputError: "Please enter a challenge first",
    footerText: "Made with ❤️ for the creative community",
    switchLanguage: "العربية",
    dir: "ltr"
  }
};

export const PREDEFINED_EXAMPLES = {
  ar: [
    { text: "تحسين إنتاجية الفريق", icon: "⏰" },
    { text: "إعادة تنظيم المساحات", icon: "🏢" },
    { text: "آلية ملاحظات العملاء", icon: "💬" },
    { text: "تقليل فاقد الاجتماعات", icon: "📅" },
  ],
  en: [
    { text: "Improve team productivity", icon: "⏰" },
    { text: "Reorganizing spaces", icon: "🏢" },
    { text: "Customer feedback mechanism", icon: "💬" },
    { text: "Reducing meeting waste", icon: "📅" },
  ]
};

export const CREATIVE_QUOTES = {
  ar: [
    { text: "الإبداع هو الذكاء وهو يمرح.", author: "ألبرت أينشتاين" },
    { text: "الابتكار هو ما يميز القائد عن التابع.", author: "ستيف جوبز" },
    { text: "لا يمكنك استنزاف الإبداع، فكلما استخدمته أكثر، زاد لديك.", author: "مايا أنجيلو" },
    { text: "الخيال أكثر أهمية من المعرفة.", author: "ألبرت أينشتاين" },
    { text: "أفضل طريقة للتنبؤ بالمستقبل هي ابتكاره.", author: "بيتر دراكر" },
    { text: "الابتكار هو القدرة على رؤية التغيير كفرصة وليس كتهديد.", author: "ستيف جوبز" },
    { text: "الإبداع يتطلب الشجاعة للتخلي عن اليقين.", author: "إريك فروم" }
  ],
  en: [
    { text: "Creativity is intelligence having fun.", author: "Albert Einstein" },
    { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
    { text: "You can't use up creativity. The more you use, the more you have.", author: "Maya Angelou" },
    { text: "Imagination is more important than knowledge.", author: "Albert Einstein" },
    { text: "The best way to predict the future is to create it.", author: "Peter Drucker" },
    { text: "Innovation is the ability to see change as an opportunity - not a threat.", author: "Steve Jobs" },
    { text: "Creativity requires the courage to let go of certainties.", author: "Erich Fromm" }
  ]
};
