import WebhookEvent from "../../models/WebhookEvent.js";

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

export const receiveWhatsAppWebhook = async (req, res) => {
    try {
        const entries = Array.isArray(req.body?.entry)
            ? req.body.entry
            : [];

        const incomingMessages = [];

        for (const entry of entries) {
            for (const change of entry.changes || []) {
                const value = change.value;

                for (const message of value?.messages || []) {
                    incomingMessages.push({
                        message,
                        phoneNumberId: value.metadata?.phone_number_id,
                    });
                }
            }
        }

        for (const item of incomingMessages) {
            const { message, phoneNumberId } = item;

            if (!message.id) continue;

            try {
                await WebhookEvent.updateOne(
                    { eventId: message.id },
                    {
                        $setOnInsert: {
                            eventId: message.id,
                            phoneNumberId,
                            from: message.from,
                            messageType: message.type,
                            payload: message,
                            status: "pending",
                        },
                    },
                    { upsert: true }
                );
            } catch (error) {
                if (error.code === 11000) {
                    continue;
                }
                throw error;
            }
        }
        console.log(
            `WhatsApp webhook received. Messages: ${incomingMessages.length}`
        );

        return res.sendStatus(200);
    } catch (error) {
        console.error("WhatsApp webhook processing error:", error.message);

        return res.sendStatus(500);
    }
};