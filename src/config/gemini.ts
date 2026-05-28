import { GoogleGenAI, ThinkingLevel } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GOGGLE_AI_API_KEY });
const chat = ai.chats.create({
  model: "gemini-3.5-flash",
  history: [],
});
const aiGemini = async () => {
  const response = await ai.models.generateContentStream({
    model: "gemini-3.5-flash",
    contents: 
    config: {
      temperature: 0.1,
      thinkingConfig: {
        thinkingLevel: ThinkingLevel.MEDIUM,
      },
    },
  });
};
