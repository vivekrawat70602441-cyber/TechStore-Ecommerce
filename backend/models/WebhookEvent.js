import mongoose from "mongoose";

const webhookEventSchema = new mongoose.Schema(
    {
        eventId: {
            type: String,
            required: true,
            unique: true,
        },

        phoneNumberId: {
            type: String,
        },

        from: {
            type: String,
        },

        messageType: {
            type: String,
        },

        payload: {
            type: mongoose.Schema.Types.Mixed,
            required: true,
        },

        status: {
            type: String,
            enum: ["pending", "processing", "processed", "failed"],
            default: "pending",
        },

        attemps: {
            type: Number,
            default: 0,
        },

        processedAt: Date,
        lastError: String,
    },
    {
        timestamps: true,
    }
);

const WebhookEvent =
    mongoose.models.WebhookEvent ||
    mongoose.model("WebhookEvent", webhookEventSchema);

export default WebhookEvent;