
import { GoogleGenAI, Type } from "@google/genai";
import { TechniqueType, TECHNIQUES, FinalSolution } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export interface EnhancedSolution extends FinalSolution {
  impact: number; // 1-10
  feasibility: number; // 1-10
  nextStep: string;
}

export async function analyzeAndSolve(problem: string, lang: 'ar' | 'en' = 'ar'): Promise<{
  techniqueId: TechniqueType;
  analysis: string;
  solutions: EnhancedSolution[];
}> {
  // تزويد النموذج بالأسماء والوصف الدقيق لكل منهجية لمساعدته على الاختيار الصحيح
  const techniqueDetails = Object.values(TECHNIQUES).map(t => 
    lang === 'ar' 
      ? `- [${t.id}] ${t.name}: ${t.description}`
      : `- [${t.id}] ${t.nameEn}: ${t.descriptionEn}`
  ).join('\n');
  
  const systemPrompt = lang === 'ar' 
    ? `بصفتك "كبير استراتيجيي الابتكار" في مختبر الإبداع، مهمتك هي تحليل التحدي واختيار الأداة الذهنية الأكثر كفاءة لحله.
التحدي المطروح: "${problem}"
مكتبة المنهجيات المتاحة وسياق استخدامها:
${techniqueDetails}
المطلوب بدقة:
1. قم بمطابقة التحدي مع المنهجية التي تمنح "أقصى قوة دفع إبداعية" بناءً على طبيعته.
2. اشرح بذكاء واختصار (في حدود 25 كلمة) لماذا هذه المنهجية تحديداً ستفكك هذا التحدي أفضل من غيرها.
3. قدم 5 حلول ابتكارية "نوعية" (تجنب البديهيات) مستوحاة من روح المنهجية المختارة.
4. لكل حل: حدد الأثر (1-10)، الجدوى (1-10)، والخطوة الأولى التنفيذية.
يجب أن يكون الرد باللغة العربية.`
    : `As a "Chief Innovation Strategist" at the Innovation Lab, your task is to analyze the challenge and select the most efficient mental tool to solve it.
Challenge: "${problem}"
Available methodologies and context:
${techniqueDetails}
Requirements:
1. Match the challenge with the methodology that gives "maximum creative momentum" based on its nature.
2. Explain intelligently and concisely (within 25 words) why this specific methodology will deconstruct this challenge better than others.
3. Provide 5 "qualitative" innovative solutions (avoid clichés) inspired by the spirit of the chosen methodology.
4. For each solution: specify Impact (1-10), Feasibility (1-10), and the first executive step.
The response must be in English.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `${systemPrompt}

Return ONLY JSON:
{
  "techniqueId": "Chosen Methodology ID",
  "analysis": "Brief analysis linking problem nature to methodology strength",
  "solutions": [
    {
      "title": "Innovative Title",
      "text": "Solution description and how it works",
      "emoji": "Emoji",
      "category": "Solution Category",
      "impact": 1-10,
      "feasibility": 1-10,
      "nextStep": "Immediate practical step"
    }
  ]
}`,
    config: {
      // ميزانية تفكير متوسطة لموازنة السرعة مع دقة الاختيار الاستراتيجي
      thinkingConfig: { thinkingBudget: 4000 },
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          techniqueId: { type: Type.STRING },
          analysis: { type: Type.STRING },
          solutions: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                text: { type: Type.STRING },
                emoji: { type: Type.STRING },
                category: { type: Type.STRING },
                impact: { type: Type.NUMBER },
                feasibility: { type: Type.NUMBER },
                nextStep: { type: Type.STRING }
              },
              required: ['title', 'text', 'emoji', 'category', 'impact', 'feasibility', 'nextStep']
            }
          }
        },
        required: ['techniqueId', 'analysis', 'solutions']
      }
    }
  });

  return JSON.parse(response.text.trim());
}
