const GRAPH_API_VERSION = process.env.WHATSAPP_API_VERSION;

export const sendWhatsAppText = async (to, message) => {
    const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
    const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;

    if (!accessToken || !phoneNumberId || !GRAPH_API_VERSION) {
        throw new Error("WhatsApp environment variables are missing");
    }

    if (!to || !/^\d{8,15}$/.test(to)) {
        throw new Error("Recipient must be a valid international phone number without +");
    }

    if (!message?.trim()) {
        throw new Error("WhatsApp message cannot be empty");
    }

    const url = `https://graph.facebook.com/${GRAPH_API_VERSION}/${phoneNumberId}/messages`;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                messaging_product: "whatsapp",
                recipient_type: "individual",
                to,
                type: "text",
                text: {
                    preview_url: false,
                    body: message.trim(),
                },
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("WhatsApp API Error:", data.error);

            throw new Error(
                data.error?.message || "Failed to send WhatsApp message"
            );
        }

        const messageId = data.messages?.[0]?.id;

        if (!messageId) {
            throw new Error("WhatsApp API did not return a message ID");
        }

        console.log("WhatsApp message accepted:", messageId);

        return {
            success: true,
            messageId,
            recipient: data.contacts?.[0]?.wa_id,
        };
    } catch (error) {
        console.error("WhatsApp sending failed:", error.message);
        throw error;
    }
};