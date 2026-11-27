import mongoose from "mongoose";

const webhookEventSchema = new mongoose.Schema(
    {
        eventId: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },

        phoneNumberId: {
            type: String,
            required: true,
        },

        from: {
            type: String,
            required: true,
        },

        messageType: {
            type: String,
            required: true,
        },

        payload: {
            type: mongoose.Schema.Types.Mixed,
            required: true,
        },

        status: {
            type: String,
            enum: ["pending", "processing", "processed", "failed"],
            default: "pending",
            index: true,
        },

        attempts: {
            type: Number,
            default: 0,
        },

        processingStartedAt: {
            type: Date,
            default: null,
        },

        processedAt: {
            type: Date,
            default: null,
        },

        nextRetryAt: {
            type: Date,
            default: null,
        },

        lastError: {
            type: String,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

const WebhookEvent =
    mongoose.models.WebhookEvent ||
    mongoose.model("WebhookEvent", webhookEventSchema);

export default WebhookEvent;