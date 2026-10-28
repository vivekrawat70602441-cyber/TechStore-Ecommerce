import mongoose from "mongoose";
import { ORDER_STATUSES } from "../utils/orderConstants.js";

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        products: [
            {
                product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
                quantity: { type: Number, required: true },
                price: { type: Number, required: true },
                costPrice: { type: Number, required: true },
            },
        ],

        shippingAddress: {
            fullName: { type: String, required: true },
            email: { type: String, required: true },
            phone: { type: String, required: true },
            address: { type: String, required: true },
            city: { type: String, required: true },
            state: { type: String, required: true },
            pincode: { type: String, required: true },
        },

        totalPrice: { type: Number, required: true },
        payment: { type: mongoose.Schema.Types.ObjectId, ref: "Payment", required: true },
        status: { type: String, enum: ORDER_STATUSES, default: "Pending" },

        statusHistory: [
            {
                status: { type: String, enum: ORDER_STATUSES, required: true },
                message: { type: String, required: true },
                timestamp: { type: Date, default: Date.now },
            },
        ],

        // Dispatch location selected by the admin
        dispatchlocation: {
            type: new mongoose.Schema(
                {
                    name: { type: String, required: true, trim: true },
                    address: { type: String, required: true, trim: true },
                    latitude: { type: Number, required: true, min: -90, max: 90 },
                    longitude: { type: Number, required: true, min: -180, max: 180 },
                    source: { type: String, enum: ["warehouse", "custom"], required: true },
                    warehouseId: { type: String, default: null },
                },
                { _id: false }
            ),
            default: undefined,
        },

        deliveryLocation: {
            type: new mongoose.Schema(
                {
                    name: { type: String, trim: true },
                    address: { type: String, trim: true },
                    latitude: { type: Number, min: -90, max: 90 },
                    longitude: { type: Number, min: -180, max: 180 },
                },
                { _id: false }
            ),
            default: undefined,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Order", orderSchema);