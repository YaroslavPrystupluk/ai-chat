import { GoogleGenAI, ThinkingLevel } from "@google/genai";

export const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_REACT_APP_GEMINI_API_KEY,
});
export const chat = ai.chats.create({
  model: "gemini-3.5-flash",
  history: [],
  config: {
    temperature: 0.1,
    thinkingConfig: {
      thinkingLevel: ThinkingLevel.MEDIUM,
    },
  },
});
// const aiGemini = async (content: string) => {
//   const response = await chat.sendMessageStream({
//     message: content,
//   });
//   for await (const chunk of response) {
//     console.log(chunk.text);
//     console.log("_".repeat(80));
//   }
// };
