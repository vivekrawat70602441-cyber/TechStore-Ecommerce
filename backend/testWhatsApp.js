import "dotenv/config";
import { sendWhatsAppText } from "./integrations/whatsapp/whatsappService.js";

const recipient = process.argv[2];

async function testWhatsApp() {
    try {
        const result = await sendWhatsAppText(
            recipient,
            "Hello! This is a test message from TechStore."
        );

        console.log("Message sending result:", result);
    } catch (error) {
        console.error("Test failed:", error.message);
        process.exitCode = 1;
    }
}

testWhatsApp();