import { GoogleGenAI } from "@google/genai";

export const generateAIResponse = async (message, products = []) => {
    try {
        const productContext = 
            products.length > 0
                ? products.map((product) => ({
                    name: product.name,
                    brand: product.brand,
                    category: product.category,
                    price: product.price,
                    originalPrice: product.originalPrice,
                    discount: product.discount,
                    rating: product.rating,
                    reviews: product.reviews,
                    stock: product.stock,
                    description: product.description,
                    slug: product.slug,
                }))
            : "No products are currently available.";

        const systemPrompt = `You are the TechStore website assistant. Answer using only the store product data below. Give prices in INR. If a product or detail is not in the data, clearly say you do not have that information instead of guessing. Keep answers concise and helpful.
        
        Store products:
        
        ${JSON.stringify(productContext)}`;

          // LOCAL DEVELOPMENT -> Ollama
        if (process.env.NODE_ENV !== "production") {
            const OLLAMA_URL = process.env.OLLAMA_URL;
            const OLLAMA_MODEL = process.env.OLLAMA_MODEL;
            const OLLAMA_API_KEY = process.env.OLLAMA_API_KEY;

            const response = await fetch(`${OLLAMA_URL}/api/chat`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...(OLLAMA_API_KEY
                         ? {
                              Authorization: `Bearer ${OLLAMA_API_KEY}`,
                           }
                         : {}),
            },

            body: JSON.stringify({
                model: OLLAMA_MODEL,
                messages: [
                    {
                        role: "system",
                        content: systemPrompt,
                    },
                    {
                        role: "user",
                        content: message,
                    },
                ],
                stream: false,
                think: false,
                options: {
                    num_predict: 64,
                    temperature: 0,
                    seed: 42,
                },
            }),
        });

    if (!response.ok) {
        consterrorText = await response.text();

        console.error("Ollama API Error:", errorText);
        throw new Error("Ollama request failed");
    }

      const data = await response.json();
      return data.message.content;

 }

 // PRODUCTION -> Gemini
 const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

 if (!GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not configured");
 }

 const ai = new GoogleGenAI({
    apiKey: GEMINI_API_KEY,
 });

 const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
        {
            role: "user",
            parts: [
                { 
                    text: `${systemPrompt}
                    User question: ${message}`,
                },
            ],
        },
    ],
 });

   return response.text;
 } catch (error) {
    console.error("AI Service Error:", error);
    throw error;
 }
};

