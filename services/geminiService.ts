/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey: API_KEY });

const SYSTEM_INSTRUCTION = `You are the Times Newsday AI Analyst. Your role is to provide insightful, objective, and deep analysis of current affairs. 
When asked about news, maintain a professional, editorial tone. Focus on context, historical background, and potential implications of events. 
Do not speculate wildly; stick to reputable journalistic standards. If asked for summaries, be concise and highlight key players and dates. 
Always refer to yourself as the 'Times Newsday Analyst'. Use clear paragraph breaks for readability.`;

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!API_KEY) {
    return "The Times Newsday archive is currently inaccessible. (Missing API Key)";
  }

  try {
    const chat = ai.chats.create({
      model: 'gemini-2.0-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION
      }
    });

    const result = await chat.sendMessage({ message });
    return result.text || "Transmission interrupted.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I apologize, but I'm having trouble connecting to my news archives at the moment. Please try again shortly.";
  }
};
