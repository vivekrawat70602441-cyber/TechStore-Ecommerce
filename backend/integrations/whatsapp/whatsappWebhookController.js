export const verifyWhatsAppWebhook = (req, res) => {
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    const verifyToken = process.env.WHATSAPP_VERIFY_TOKEN;

    if (!verifyToken) {
        console.error("WHATSAPP_VERIFY_TOKEN is missing");
        return res.sendStatus(500);
    }

    if (mode === "subscribe" && token === verifyToken) {
        console.log("WhatsApp webhook verified successfully");
        return res.status(200).send(challenge);
    }

    console.warn("WhatsApp webhook verification failed");
    return res.sendStatus(403);
};