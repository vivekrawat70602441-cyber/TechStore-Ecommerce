import express from "express";
import { verifyWhatsAppWebhook } from "./whatsappWebhookController.js";

const router = express.Router();

router.get("/", verifyWhatsAppWebhook);

export default router;