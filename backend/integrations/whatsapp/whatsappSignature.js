import crypto from "node:crypto";

export const verifyWhatsAppSignature = (req, res, next) => {
    const appSecret = process.env.WHATSAPP_APP_SECRET;
    const signature = req.get("x-hub-signature-256");

    if (!appSecret) {
        console.error("WHATSAPP_APP_SECRET is missing");
        return res.sendStatus(500);
    }

    if (!req.rawBody || !signature?.startsWith("sha256=")) {
        return res.sendStatus(401);
    }

    const receivedSignature = signature.slice(7);

    if (!/^[a-f0-9]{64}$/i.test(receivedSignature)) {
        return res.sendStatus(401);
    }

    const expectedSignature = crypto
        .createHmac("sha256", appSecret)
        .update(req.rawBody)
        .digest();

    const actualSignature = Buffer.from(
        receivedSignature,
        "hex"
    );

    if (
        actualSignature.length !== expectedSignature.length ||
        !crypto.timingSafeEqual(actualSignature, expectedSignature)
    ) {
        console.warn("Invalid WhatsApp webhook signature");
        return res.sendStatus(401);
    }
    next();
};