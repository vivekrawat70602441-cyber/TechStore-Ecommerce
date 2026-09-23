import Newsletter from "../models/Newsletter.js";

export const subscribeNewsletter = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                message: "Email is required",
            });
        }

        const existingSubscriber = await Newsletter.findOne({ email });
        if (existingSubscriber) {
            return res.status(409).json({
                message: "Email is already subscribed",
            });
        }
        const subscriber = await Newsletter.create({ email });
        return res.status(201).json({
            message: "Successfully subscribed to newsletter",
            subscriber,
        });
    } catch (error) {
        console.error("Newsletter subscription error:", error);
        return res.status(500).json({
            message: "Something went wrong",
        });
    }
};

export const getSubscribers = async (req, res) => {
    try {
        const subscribers = await Newsletter.find().sort({ createdAt: -1 });
        return res.status(200).json(subscribers);
    } catch (error) {
        console.error("Get newsletter subscribers error:", error);
        return res.status(500).json({
            message: "Failed to fetch newsletter subscribers",
        });
    }
};