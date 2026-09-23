import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },

        slug: {
            type: String,
            required: true,
            unique: true,
        },

        brand: {
            type: String,
            required: true,
        },

        category: {
            type: String,
            required: true,
        },

        sku: {
            type: String,
            default: "",
        },

        stock: {
            type: Number,
            default: 0,
        },

        description: {
            type: String,
            default: "",
        },

        image: {
            type: String,
            default: "",
        },

        images: {
            type: [String],
            default: [],
        },

        price: {
            type: Number,
            required: true,
        },

        costPrice: {
            type: Number,
            default: 0,
        },

        originalPrice: {
            type: Number,
            default: 0,
        },

        rating: {
            type: Number,
            default: 0,
        },

        reviews: {
            type: Number,
            default: 0,
        },

        discount: {
            type: Number,
            default: 0,
        },

        isBestSeller: {
            type: Boolean,
            default: false,
        },

        isSale: {
            type: Boolean,
            default: false,
        },

        NewArrival: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model("Product", productSchema);

export default Product;