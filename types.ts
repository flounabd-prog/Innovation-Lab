
export type TechniqueType = 
  | 'SCAMPER' 
  | 'SIX_HATS' 
  | 'FIRST_PRINCIPLES' 
  | 'REVERSE_BRAINSTORMING' 
  | 'TRIZ' 
  | 'SWOT' 
  | 'DISNEY' 
  | 'LATERAL' 
  | 'BLUE_OCEAN' 
  | 'ATTRIBUTE_LISTING' 
  | 'LOTUS_BLOSSOM'
  | 'STEM'
  | 'CONCEPT_MAPPING'
  | 'MORPHOLOGICAL_ANALYSIS'
  | 'BRAINWRITING'
  | 'MIND_MAPPING'
  | 'REFRAMING'
  | 'RANDOM_WORD'
  | 'FIVE_WHYS'
  | 'FISHBONE'
  | 'SIMPLIFICATION';

export interface TechniqueInfo {
  id: TechniqueType;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  icon: string;
}

export interface InspirationItem {
  title: string;
  description: string;
  icon: string;
}

export interface Step {
  id: string;
  label: string;
  description: string;
  aiSuggestions?: InspirationItem[];
  userAnswer?: string;
}

export interface FinalSolution {
  title: string;
  text: string;
  emoji: string;
  category: string;
}

export interface CreativeSession {
  problem: string;
  technique: TechniqueInfo;
  analysis: string;
  steps: Step[];
  currentStepIndex: number;
  finalSolutions: FinalSolution[];
  status: 'input' | 'analyzing' | 'iterating' | 'finished';
}

export const TECHNIQUES: Record<TechniqueType, TechniqueInfo> = {
  SCAMPER: {
    id: 'SCAMPER',
    name: 'سكامبر (SCAMPER)',
    nameEn: 'SCAMPER',
    description: 'تطوير الأفكار من خلال الاستبدال، الدمج، التكيف، التعديل، الاستخدام لغرض آخر، الحذف، والقلب.',
    descriptionEn: 'Develop ideas through Substitution, Combination, Adaptation, Modification, Put to another use, Elimination, and Reverse.',
    icon: '🚀'
  },
  SIX_HATS: {
    id: 'SIX_HATS',
    name: 'القبعات الست للتفكير',
    nameEn: 'Six Thinking Hats',
    description: 'تحليل المشكلة من 6 زوايا مختلفة (الحقائق، المشاعر، المخاطر، الفوائد، الإبداع، والإدارة).',
    descriptionEn: 'Analyze the problem from 6 different perspectives (Facts, Feelings, Risks, Benefits, Creativity, and Management).',
    icon: '🎩'
  },
  FIRST_PRINCIPLES: {
    id: 'FIRST_PRINCIPLES',
    name: 'التفكير بالمبادئ الأولية',
    nameEn: 'First Principles Thinking',
    description: 'تفكيك المشكلة إلى حقائقها الأساسية وإعادة بنائها من الصفر.',
    descriptionEn: 'Deconstruct the problem into its fundamental truths and rebuild it from scratch.',
    icon: '🧱'
  },
  REVERSE_BRAINSTORMING: {
    id: 'REVERSE_BRAINSTORMING',
    name: 'العصف الذهني العكسي',
    nameEn: 'Reverse Brainstorming',
    description: 'البحث عن طرق لـ "إحداث" المشكلة بدلاً من حلها، ثم عكس تلك الطرق للوصول للحل.',
    descriptionEn: 'Look for ways to "cause" the problem instead of solving it, then reverse those ways to reach a solution.',
    icon: '🔄'
  },
  TRIZ: {
    id: 'TRIZ',
    name: 'نظرية تريز (TRIZ)',
    nameEn: 'TRIZ Theory',
    description: 'حل المشكلات الابتكارية بناءً على الأنماط التقنية والتناقضات المادية.',
    descriptionEn: 'Solve innovative problems based on technical patterns and physical contradictions.',
    icon: '⚙️'
  },
  SWOT: {
    id: 'SWOT',
    name: 'تحليل سوات (SWOT)',
    nameEn: 'SWOT Analysis',
    description: 'تحليل نقاط القوة، الضعف، الفرص، والتهديدات المحيطة بالتحدي.',
    descriptionEn: 'Analyze Strengths, Weaknesses, Opportunities, and Threats surrounding the challenge.',
    icon: '📊'
  },
  DISNEY: {
    id: 'DISNEY',
    name: 'طريقة ديزني الإبداعية',
    nameEn: 'Disney Creative Method',
    description: 'تقسيم التفكير إلى ثلاث مراحل: الحالم (الأفكار)، الواقعي (التنفيذ)، والناقد (الثغرات).',
    descriptionEn: 'Divide thinking into three stages: The Dreamer (Ideas), The Realist (Execution), and The Critic (Gaps).',
    icon: '🏰'
  },
  LATERAL: {
    id: 'LATERAL',
    name: 'التفكير الجانبي (ديبونو)',
    nameEn: 'Lateral Thinking (De Bono)',
    description: 'استخدام أساليب "الاستفزاز" والكلمات العشوائية لفتح مسارات تفكير غير متوقعة.',
    descriptionEn: 'Use "provocation" methods and random words to open unexpected thinking paths.',
    icon: '⚡'
  },
  BLUE_OCEAN: {
    id: 'BLUE_OCEAN',
    name: 'استراتيجية المحيط الأزرق',
    nameEn: 'Blue Ocean Strategy',
    description: 'التركيز على خلق مساحة سوقية جديدة وخالية من المنافسة بدلاً من الصراع في المحيطات الحمراء.',
    descriptionEn: 'Focus on creating a new, competition-free market space instead of fighting in red oceans.',
    icon: '🌊'
  },
  ATTRIBUTE_LISTING: {
    id: 'ATTRIBUTE_LISTING',
    name: 'قائمة السمات والخصائص',
    nameEn: 'Attribute Listing',
    description: 'تفكيك المنتج أو المشكلة إلى أجزاء صغيرة جداً وتحسين كل جزء على حدة.',
    descriptionEn: 'Deconstruct the product or problem into very small parts and improve each part individually.',
    icon: '🔍'
  },
  LOTUS_BLOSSOM: {
    id: 'LOTUS_BLOSSOM',
    name: 'تفتح اللوتس (Lotus Blossom)',
    nameEn: 'Lotus Blossom',
    description: 'تقنية يابانية للتوسع في فكرة مركزية وتوليد 8 أفكار فرعية لكل فكرة من الأفكار الثمانية الأساسية.',
    descriptionEn: 'A Japanese technique for expanding on a central idea and generating 8 sub-ideas for each of the 8 core ideas.',
    icon: '🪷'
  },
  STEM: {
    id: 'STEM',
    name: 'تفكير ستيم (STEM)',
    nameEn: 'STEM Thinking',
    description: 'تطبيق منهجية العلوم والتكنولوجيا والهندسة والرياضيات لحل المشكلات التقنية والهيكلية.',
    descriptionEn: 'Apply Science, Technology, Engineering, and Mathematics methodology to solve technical and structural problems.',
    icon: '🧬'
  },
  CONCEPT_MAPPING: {
    id: 'CONCEPT_MAPPING',
    name: 'خريطة المفاهيم',
    nameEn: 'Concept Mapping',
    description: 'ربط الأفكار ببعضها بصرياً لاكتشاف علاقات خفية بين المكونات المختلفة للمشكلة.',
    descriptionEn: 'Visually connect ideas to discover hidden relationships between different components of the problem.',
    icon: '🗺️'
  },
  MORPHOLOGICAL_ANALYSIS: {
    id: 'MORPHOLOGICAL_ANALYSIS',
    name: 'التحليل المورفولوجي',
    nameEn: 'Morphological Analysis',
    description: 'استكشاف كافة الاحتمالات عبر تفكيك المشكلة إلى أبعادها وتجربة تركيبات جديدة.',
    descriptionEn: 'Explore all possibilities by deconstructing the problem into its dimensions and trying new combinations.',
    icon: '🧩'
  },
  BRAINWRITING: {
    id: 'BRAINWRITING',
    name: 'الكتابة الذهنية (Brainwriting)',
    nameEn: 'Brainwriting',
    description: 'توليد أفكار مكثفة عبر الكتابة التدويرية لتجنب سيطرة رأي واحد وتحفيز الجميع.',
    descriptionEn: 'Generate intensive ideas through circular writing to avoid one-person dominance and stimulate everyone.',
    icon: '📝'
  },
  MIND_MAPPING: {
    id: 'MIND_MAPPING',
    name: 'الخرائط الذهنية',
    nameEn: 'Mind Mapping',
    description: 'تمثيل مرئي للمشكلة يسهل فهم العلاقات المعقدة واكتشاف ثغرات التفكير.',
    descriptionEn: 'A visual representation of the problem that facilitates understanding complex relationships and discovering thinking gaps.',
    icon: '🧠'
  },
  REFRAMING: {
    id: 'REFRAMING',
    name: 'مصفوفة إعادة التأطير',
    nameEn: 'Reframing Matrix',
    description: 'النظر للمشكلة من وجهات نظر مختلفة تماماً (قانونية، تسويقية، تقنية) لتغيير تعريف التحدي.',
    descriptionEn: 'Look at the problem from completely different perspectives (legal, marketing, technical) to change the definition of the challenge.',
    icon: '🖼️'
  },
  RANDOM_WORD: {
    id: 'RANDOM_WORD',
    name: 'الربط العشوائي',
    nameEn: 'Random Word Association',
    description: 'كسر الجمود الفكري عبر ربط المشكلة بكلمة أو صورة عشوائية تماماً لتوليد شرارة إبداعية.',
    descriptionEn: 'Break mental stagnation by linking the problem to a completely random word or image to generate a creative spark.',
    icon: '🎲'
  },
  FIVE_WHYS: {
    id: 'FIVE_WHYS',
    name: 'الأسئلة الخمسة (لماذا؟)',
    nameEn: 'Five Whys',
    description: 'التعمق في جذور المشكلة للوصول إلى السبب الحقيقي الكامن وراء العوارض الظاهرية.',
    descriptionEn: 'Delve into the roots of the problem to reach the true cause underlying the apparent symptoms.',
    icon: '❓'
  },
  FISHBONE: {
    id: 'FISHBONE',
    name: 'مخطط عظمة السمكة',
    nameEn: 'Fishbone Diagram',
    description: 'تصنيف مسببات المشكلة إلى فئات (البشر، العمليات، البيئة) لتحديد مكان الخلل بدقة.',
    descriptionEn: 'Categorize the causes of the problem into categories (People, Processes, Environment) to accurately identify the flaw.',
    icon: '🐟'
  },  SIMPLIFICATION: {
    id: 'SIMPLIFICATION',
    name: 'مبدأ التبسيط الأقصى',
    nameEn: 'Maximum Simplification',
    description: 'البحث عن الحل الأبسط عبر إزالة كل ما هو غير ضروري حتى يتبقى جوهر الفكرة فقط.',
    descriptionEn: 'Search for the simplest solution by removing everything unnecessary until only the essence of the idea remains.',
    icon: '✂️'
  },
};
