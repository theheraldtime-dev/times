/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI } from "@google/genai";

// We are using your key directly here to bypass any GitHub Secret issues for now
const API_KEY = 'AIzaSyDxq1QpuFFBPO2Nozxewt5hQ_XlI5fleEU'; 
const ai = new GoogleGenAI({ apiKey: API_KEY });

const SYSTEM_INSTRUCTION = `You are the Times Newsday AI Analyst. Your role is to provide insightful, objective, and deep news analysis. 
When asked about news, maintain a professional, editorial tone. Focus on context, historical background, and potential implications. 
Do not speculate wildly; stick to reputable journalistic standards. If asked for summaries, be concise and highlight key points. 
Always refer to yourself as the 'Times Newsday Analyst'. Use clear paragraph breaks for readability.`;

export const sendMessageToGemini = async (message: string): Promise<string> => {
  // If API_KEY is empty, show the error we saw in your screenshots
  if (!API_KEY || API_KEY === 'PASTE_YOUR_KEY_HERE') {
    return "The Times Newsday archive is currently inaccessible. (Missing API Key)";
  }

  try {
    const chat = ai.chats.create({
      model: 'gemini-1.5-flash', // Using 1.5 Flash for the fastest response
      config: {
        systemInstruction: SYSTEM_INSTRUCTION
      }
    });

    const result = await chat.sendMessage({ message });
    
    return result?.text || "Transmission interrupted.";
    
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I apologize, but I'm having trouble connecting to my news archives at the moment. Please try again shortly.";
  }
};
