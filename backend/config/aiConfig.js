const aiConfig = {
    provider: process.env.AI_PROVIDER || "gemini",

    gemini: {
        apiKey: process.env.GEMINI_API_KEY,
        model: process.env.GEMINI_MODEL || "gemini-3.5-flash-lite",
    },


};

if (aiConfig.provider !== "gemini") {
    throw new Error("Only Gemini provider is supported");
}

if (!aiConfig.gemini.apiKey) {
    throw new Error("GEMINI_API_KEY is missing");
}

export default aiConfig;