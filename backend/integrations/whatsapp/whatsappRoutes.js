import express from "express";
import { verifyWhatsAppWebhook, receiveWhatsAppWebhook } from "./whatsappWebhookController.js";
import { verifyWhatsAppSignature } from "./whatsappSignature.js";

const router = express.Router();

router.get("/", verifyWhatsAppWebhook);
router.post(
    "/",
    verifyWhatsAppSignature,
    receiveWhatsAppWebhook
);

export default router;