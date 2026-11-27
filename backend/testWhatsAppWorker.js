import "dotenv/config";
import dns from "node:dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

import mongoose from "mongoose";
import connectDB from "./config/db.js";
import WebhookEvent from "./models/WebhookEvent.js";

import { claimNextWebhookEvent, recoverStuckWebhookEvents } from "./integrations/whatsapp/whatsappWorker.js";

const TEST_EVENT_ID = `worker-test-${Date.now()}`;

const runTest = async () => {
    let testPassed = false;

    try {
        await connectDB();

        // 1. Create a temporary test event.
        await WebhookEvent.create({
            eventId: TEST_EVENT_ID,
            phoneNumberId: "test-phone-number",
            from: "919999999999",
            messageType: "text",
            payload: {
                type: "text",
                text: { body: "Worker test message" },
            },
            status: "pending",
            attempts: 0,
        });

        console.log("1. Test event created");

        // 2. Claim the specific test event.
        const claimedEvent =
            await claimNextWebhookEvent(TEST_EVENT_ID);

        if (
            !claimedEvent ||
            claimedEvent.status !== "processing" ||
            claimedEvent.attempts !== 1
        ) {
            throw new Error("Message claiming test failed");
        }

        console.log("2. Message claimed successfully");

        // 3. Simulate a worker that has been stuck for 6 minutes

        await WebhookEvent.updateOne(
            { eventId: TEST_EVENT_ID },
            {
                $set: {
                    processingStartedAt: new Date(
                        Date.now() - 6 * 60 * 1000
                    ),
                },
            }
        );

        // 4. Recover the stuck event.
        const recoveredCount =
            await recoverStuckWebhookEvents(TEST_EVENT_ID);

        if (recoveredCount !== 1) {
            throw new Error("Message recovery test failed");
        }

        const recoveredEvent = await WebhookEvent.findOne({
            eventId: TEST_EVENT_ID,
        }).lean();

        if (
            recoveredEvent.status !== "pending" ||
            recoveredEvent.processingStartedAt !== null
        ) {
            throw new Error("Recovered event has an incorrect status");
        }

        console.log("3. Stuck message recovered successfully");

        testPassed = true;
        console.log("SUCCESS: All worker tests passed");
    } catch (error) {
        console.error("Worker test failed:", error.message);
        process.exitCode = 1;
    } finally {
        // Delete only this temporary test event.
        if (mongoose.connection.readyState === 1) {
            await WebhookEvent.deleteOne({
                eventId: TEST_EVENT_ID,
            });

            console.log("Test event cleaned up");

            await mongoose.disconnect();
        }
    }
};

runTest();