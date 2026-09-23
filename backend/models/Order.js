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
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },

                quantity: {
                    type: Number,
                    required: true,
                },

                price: {
                    type: Number,
                    required: true,
                },

                costPrice: {
                    type: Number,
                    required: true,
                },
            },
        ],

        shippingAddress: {
            fullName: {
                type: String,
                required: true,
            },

            email: {
                type: String,
                required: true,
            },

            phone: {
                type: String,
                required: true,
            },

            address: {
                type: String,
                required: true,
            },

            city: {
                type: String,
                required: true,
            },

            state: {
                type: String,
                required: true,
            },

            pincode: {
                type: String,
                required: true,
            },
        },

        totalPrice: {
            type: Number,
            required: true,
        },

        payment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Payment",
            required: true,
        },

        status: {
            type: String,
            enum: ORDER_STATUSES,
            default: "Pending",
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Order", orderSchema);