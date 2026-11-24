import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

async function testGemini() {
    try {
        console.log("Sending request to Gemini...");

        const response = await ai.models.generateContent({
            model: process.env.GEMINI_MODEL,
            contents: "Reply with exactly: Gemini is working",
        });

        console.log("Gemini response:", response.text);
    } catch (error) {
        console.error("Gemini test failed:", error);
        console.error("Underlying cause:", error.cause);
    }
}

testGemini();