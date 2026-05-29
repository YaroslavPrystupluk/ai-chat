import { GoogleGenAI, ThinkingLevel } from "@google/genai";

export const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_REACT_APP_GEMINI_API_KEY,
});
export const chat = ai.chats.create({
  model: "gemini-2.5-flash",
  history: [],
  // config: {
  //   temperature: 0.1,
  //   thinkingConfig: {
  //     thinkingLevel: ThinkingLevel.LOW,
  //   },
  // },
});

