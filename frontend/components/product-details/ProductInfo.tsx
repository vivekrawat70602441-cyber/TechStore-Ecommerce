"use client";

import type { Product } from "@/types/product";
import { Star } from "lucide-react";

interface ProductInfoProps {
    product: Product;
}

export default function ProductInfo({
    product,
}: ProductInfoProps) {

    const roundedRating = Math.round(product.rating);

    return (
        <div className="space-y-7">

            {/* Brand */}
            <p className="text-sm font-medium uppercase tracking-wide text-blue-600 dark:text-blue-400">
                {product.brand}
            </p>

            {/* Product Name */}
            <h1 className="text-4xl font-bold leading-tight text-gray-900 dark:text-white">
                {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                            key={star}
                            size={18}
                            className={
                                star <= roundedRating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300 dark:text-slate-600"
                            }
                        />
                    ))}
                </div>

                <span className="text-gray-600 transition-colors duration-300 dark:text-gray-400">
                    {product.rating} ({product.reviews} Reviews)
                </span>

            </div>

            {/* Price */}
            <div className="flex flex-wrap items-center gap-5">

                <span className="text-4xl font-bold text-blue-600">
                    ₹{product.price.toLocaleString("en-IN")}
                </span>

                <span className="text-xl text-gray-400 line-through transition-colors duration-300 dark:text-gray-500">
                    ₹{product.originalPrice.toLocaleString("en-IN")}
                </span>

                {product.discount > 0 && (
                    <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-600 dark:bg-red-900/30 dark:text-red-400">
                        {product.discount}% OFF
                    </span>
                )}

            </div>

            {/* Stock */}
            <div>

                {product.stock > 0 ? (
                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
                        ✔ In Stock ({product.stock} Available)
                    </span>
                ) : (
                    <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700 dark:bg-red-900/30 dark:text-red-400">
                        ✖ Out of Stock
                    </span>
                )}

            </div>

            {/* Description */}
            <p className="leading-8 text-gray-600 transition-colors duration-300 dark:text-gray-300">
                {product.description}
            </p>

            {/* Product Info */}
            <div className="space-y-4 border-t border-gray-200 pt-6 transition-colors duration-300 dark:border-slate-700">

                <div className="flex justify-between">
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                        Brand
                    </span>

                    <span className="text-gray-900 dark:text-white">
                        {product.brand}
                    </span>
                </div>

                <div className="flex justify-between">
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                        Category
                    </span>

                    <span className="text-gray-900 dark:text-white">
                        {product.category}
                    </span>
                </div>

                <div className="flex justify-between">
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                        SKU
                    </span>

                    <span className="text-gray-900 dark:text-white">
                        {product.sku}
                    </span>
                </div>

                <div className="flex justify-between">

                    <span className="font-medium text-gray-700 dark:text-gray-300">
                        Availability
                    </span>

                    <span
                        className={
                            product.stock > 0
                                ? "font-medium text-green-600 dark:text-green-400"
                                : "font-medium text-red-600 dark:text-red-400"
                        }
                    >
                        {product.stock > 0
                            ? `${product.stock} in stock`
                            : "Out of Stock"}
                    </span>

                </div>

            </div>

        </div>
    );
}