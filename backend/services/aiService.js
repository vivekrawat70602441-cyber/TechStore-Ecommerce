import { generateAIText } from "../ai/services/aiProviderService.js";

export const generateAIResponse = async (message, products = []) => {
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
            : [];

    const systemPrompt = `
        You are the TechStore website assistant.

        Answer customer questions using only the provided store product data.

        Rules:
        - Give prices in INR.
        - Never invent product information.
        - If information i unavailable, clearly say so.
        - Keep answers concise and helpful.
        
        Store products:
        
        ${JSON.stringify(productContext)}
        `;

    return generateAIText({
        systemPrompt,
        userMessage: message,
    });
};
