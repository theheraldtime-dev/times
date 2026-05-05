/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI } from "@google/genai";

// Use your direct key since we know it's working now
const API_KEY = 'AIzaSyDxq1QpuFFBPO2Nozxewt5hQ_XlI5fleEU'; 
const ai = new GoogleGenAI({ apiKey: API_KEY });

const SYSTEM_INSTRUCTION = `You are the Times Newsday AI Analyst. Your role is to provide insightful, objective, and deep news analysis. 
When asked about news, maintain a professional, editorial tone. Focus on context, historical background, and potential implications. 
Do not speculate wildly; stick to reputable journalistic standards. If asked for summaries, be concise and highlight key points. 
Always refer to yourself as the 'Times Newsday Analyst'. Use clear paragraph breaks for readability.`;

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!API_KEY) {
    return "The Times Newsday archive is currently inaccessible. (Missing API Key)";
  }

  try {
    // We are using gemini-1.5-flash-latest for maximum compatibility
    const chat = ai.chats.create({
      model: 'gemini-1.5-flash-latest',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
        topP: 0.8,
        topK: 40
      }
    });

    const result = await chat.sendMessage({ message });
    
    // If the AI returns a response, use it. Otherwise, show a specific error.
    if (result && result.text) {
        return result.text;
    } else {
        return "The analyst is currently reviewing the records. Please rephrase your question.";
    }
    
  } catch (error) {
    console.error("Gemini Error:", error);
    // This is the message you saw in image_db665f.jpg
    return "I apologize, but I'm having trouble connecting to my news archives at the moment. Please try again shortly.";
  }
};
