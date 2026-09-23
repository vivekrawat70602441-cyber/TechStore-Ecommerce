"use client";

import type { Product } from "@/types/product";

interface ProductEditPricingProps {
    product: Product;
    handleChange: (
        field: keyof Product,
        value: Product[keyof Product]
    ) => void;
}

export default function ProductEditPricing({
    product,
    handleChange
}: ProductEditPricingProps) {
    return (
        <>
            <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Stock
                </label>

                <input
                    type="number"
                    min="0"
                    value={product.stock}
                    onChange={(e) =>
                        handleChange(
                            "stock",
                            Number(e.target.value)
                        )
                    }
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Price
                </label>

                <input
                    type="number"
                    min="0"
                    value={product.price}
                    onChange={(e) =>
                        handleChange(
                            "price",
                            Number(e.target.value)
                        )
                    }
                    required
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Original Price
                </label>

                <input
                    type="number"
                    min="0"
                    value={product.originalPrice}
                    onChange={(e) =>
                        handleChange(
                            "originalPrice",
                            Number(e.target.value)
                        )
                    }
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Discount (%)
                </label>

                <input
                    type="number"
                    min="0"
                    max="100"
                    value={product.discount}
                    onChange={(e) =>
                        handleChange(
                            "discount",
                            Number(e.target.value)
                        )
                    }
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Rating
                </label>

                <input
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    value={product.rating}
                    onChange={(e) =>
                        handleChange(
                            "rating",
                            Number(e.target.value)
                        )
                    }
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Reviews
                </label>

                <input
                    type="number"
                    min="0"
                    value={product.reviews}
                    onChange={(e) =>
                        handleChange(
                            "reviews",
                            Number(e.target.value)
                        )
                    }
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
            </div>
        </>
    );
}