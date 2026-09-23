import { generateAIResponse } from "../services/aiService.js";
import Product from "../models/Product.js";

export const chat = async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({
                message: "Message is required",
            });
        }

        const products = await Product.find()
            .select("name brand category price originalPrice discount rating reviews stock description slug")
            .lean();

        const asksForProductCount =
            /(?:how many|number of|count|total).*(?:product)/i.test(message) ||
            /(?:kitne|kitna|total).*(?:product)/i.test(message) ||
            /(?:product).*(?:kitne|kitna|count|total)/i.test(message);

        if (asksForProductCount) {
            return res.status(200).json({
                response: `Aapki website par total ${products.length} products available hain.`,
            });
        }

        const response = await generateAIResponse(message, products);
        res.status(200).json({
            response,
        });
    } catch (error) {
        console.error("Chat error:", error);
        res.status(500).json({
            message: "Something went wrong",
        });
    }
};