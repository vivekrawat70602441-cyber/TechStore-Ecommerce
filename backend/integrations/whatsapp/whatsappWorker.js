import WebhookEvent from "../../models/WebhookEvent.js";
import Product from "../../models/Product.js";

import { generateAIResponse } from "../../services/aiService.js";
import { sendWhatsAppText } from "./whatsappService.js";

const PROCESSING_TIMEOUT_MS = 5 * 60 * 1000;
const MAX_ATTEMPTS = 5;
const POLL_INTERVAL_MS = 2000;

let workerStarted = false;

// Claim one pending event atomically.
export const claimNextWebhookEvent = async (eventId = null) => {
    const now = new Date();

    return WebhookEvent.findOneAndUpdate(
        {
            status: "pending",
            attempts: { $lt: MAX_ATTEMPTS },

            ...(eventId ? { eventId } : {}),

            $or: [
                { nextRetryAt: null },
                { nextRetryAt: { $exists: false }},
                { nextRetryAt: { $lte: now }},
            ],
        },
        {
            $set: {
                status: "processing",
                processingStartedAt: now,
                lastError: null,
            },
            $inc: {
                attempts: 1,
            },
        },
        {
            returnDocument: "after",
            sort: { createdAt: 1 },
        }
    ).lean();
};

// Recover events abandoned by a crashed worker.
export const recoverStuckWebhookEvents = async (eventId = null) => {
    const timeoutDate = new Date(
        Date.now() - PROCESSING_TIMEOUT_MS
    );

    const filter = {
        status: "processing",
        processingStartedAt: { $lte: timeoutDate },
        ...(eventId ? { eventId } : {}),
    };

    const retryResult = await WebhookEvent.updateMany(
        {
            ...filter,
            attempts: { $lt: MAX_ATTEMPTS },
        },
        {
            $set: {
                status: "pending",
                processingStartedAt: null,
                nextRetryAt: new Date(),
                lastError: "Processing lease expired.",
            },
        }
    );

    const failedResult = await WebhookEvent.updateMany(
        {
            ...filter,
            attempts: { $gte: MAX_ATTEMPTS },
        },
        {
            $set: {
                status: "failed",
                processingStartedAt: null,
                nextRetryAt: null,
                lastError: "Maximum processing attemps reached.",
            },
        }
    );

    return {
        recovered: retryResult.modifiedCount,
        permanentFailed: failedResult.modifiedCount,
    };
};

// Calculate retry delay using exponential backoff.
const getRetryDelay = (attempts) => {
    const delay = 30 * 1000 * Math.pow(2, attemps - 1);

    return Math.min(delay, 15 * 60 * 1000);
};

// Process one claimed WhatsApp event.
export const processWhatsAppEvent = async (event) => {
    try {
        const message =  event.payload;

        let customerMessage = "";

        if (message.type === "test") {
            customerMessage = message.text?.body?.trim() || "";
        } else {
            await sendWhatsAppText(
                event.from,
                "Currently, I can understand text messages only. Please send your question as text."
            );
        }

        if (customerMessage) {
            const products = await Product.find()
               .select(
                "name brand category price originalPrice discount rating reviews stock description slug"
               )
               .lean();

               const aiResponse = await generateAIResponse(
                customerMessage,
                products
               );

               if (!aiResponse || typeof aiResponse !== "string") {
                 throw new Error("Gemini returned an invalied response");
               }

               await sendWhatsAppText(event.from, aiResponse);
        }

        await WebhookEvent.updateOne(
            {
                _id: event._id,
                status: "processing",
            },
            {
                $set: {
                    status: "processed",
                    processedAt: new Date(),
                    processingStartedAt: null,
                    nextRetryAt: null,
                    lastError: null,
                },
            }
        );

        console.log("WhatsApp event processed:", event.eventId);
    } catch (error) {
        console.error(
            "WhatsApp event processing failed:",
            event.eventId,
            error.message
        );

        const permanentlyFailed = event.attempts >= MAX_ATTEMPTS;

        const update = {
            status: permanentlyFailed ? "failed" : "pending",
            processingStartedAt: null,
            lastError: error.message,
            nextRetryAt: permanentlyFailed
                ? null
                : new Date(Date.now() + getRetryDelay(event.attempts)),
        };

        await WebhookEvent.updateOne(
            {
                _id: event._id,
                status: "processing",
            },
            {
                $set: update,
            }
        );
    }
};

// Start the background worker.
export const startWhatsAppWorker = () => {
    if (workerStarted) {
        console.log("WhatsApp worker is already running");
        return;
    }

    workerStarted = true;
    console.log("WhatsApp message worker started");

    const run = async () => {
        while (workerStarted) {
            try {
                await recoverStuckWebhookEvents();

                const event = await claimNextWebhookEvent();

                if (event) {
                    await processWhatsAppEvent(event);
                    continue;
                }
            } catch (error) {
                console.error("WhatsApp worker error:", error.message);
            }

            await new Promise((resolve) => 
                setTimeout(resolve, POLL_INTERVAL_MS)
            );
        }
    };

    run().catch((error) => {
        console.error("WhatsApp worker stopped:", error.message);
        workerStarted = false;
    });
};