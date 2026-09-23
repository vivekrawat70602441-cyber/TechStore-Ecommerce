export const generateAIResponse = async (message, products = []) => {
    try {
        const productContext = products.length > 0
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

        const OLLAMA_URL = process.env.OLLAMA_URL;
        const OLLAMA_MODEL = process.env.OLLAMA_MODEL;

        const response = await fetch(`${OLLAMA_URL}/api/chat`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: OLLAMA_MODEL,
                messages: [
                    {
                        role: "system",
                        content: `You are the TechStore website assistant. Answer using only the store product data below. Give prices in INR. If a product or detail is not in the data, clearly say you do not have that information instead of guessing. Keep answers concise and helpful.

Store products:
${JSON.stringify(productContext)}`,
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
            throw new Error("AI model request failed");
        }

        const data = await response.json();
        return data.message.content;
    } catch (error) {
        console.error("AI Service Error:", error);
        throw error;
    }
};