import { GoogleGenAI } from "@google/genai";
import aiConfig from "../../config/aiConfig.js";

const geminiClient = new GoogleGenAI({
    apiKey: aiConfig.gemini.apiKey,
});


export const generateAIText = async ({
    systemPrompt,
    userMessage,
}) => {
    if (!systemPrompt?.trim() || !userMessage?.trim()) {
        throw new Error("System prompt and user message are required");
    }

    try {
        const response = await geminiClient.models.generateContent({
            model: aiConfig.gemini.model,
            contents: userMessage,
            config: {
                systemInstruction: systemPrompt,
                temperature: 0.2,
                maxOutputTokens: 512,
            },
        });

        const text = response.text?.trim();

        if (!text) {
            throw new Error("Gemini returned an empty response");
        }
        return text;
    } catch (error) {
        console.log("Gemini API Error:", error.message);
        throw error;
    }
};
