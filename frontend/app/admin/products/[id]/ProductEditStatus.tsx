"use client";

import type { Product } from "@/types/product";

interface ProductEditStatusProps {
    product: Product;

    handleChange: (
        field: keyof Product,
        value: Product[keyof Product]
    ) => void;
}

export default function ProductEditStatus({
    product,
    handleChange,
}: ProductEditStatusProps) {
    return (
        <div className="md:col-span-2">
            <div className="grid gap-4 sm:grid-cols-3">
                <label className="flex items-center gap-3 rounded-lg border border-gray-200 p-4 dark:border-slate-700">
                    <input
                        type="checkbox"
                        checked={Boolean(product.isBestSeller)}
                        onChange={(e) =>
                            handleChange(
                                "isBestSeller",
                                e.target.checked
                            )
                        }
                        className="h-4 w-4"
                    />

                    <span className="text-sm text-gray-700 dark:text-gray-300">
                        Best Seller
                    </span>
                </label>

                <label className="flex-center gap-3 rounded-lg border border-gray-200 p-4 dark:border-slate-700">
                    <input
                        type="checkbox"
                        checked={Boolean(product.isSale)}
                        onChange={(e) =>
                            handleChange(
                                "isSale",
                                e.target.checked
                            )
                        }
                        className="h-4 w-4"
                    />

                    <span className="text-sm text-gray-700 dark:text-gray-300">
                        Sale
                    </span>
                </label>

                <label className="flex items-center gap-3 rounded-lg border border-gray-200 p-4 dark:border-slate-700">
                    <input
                        type="checkbox"
                        checked={Boolean(product.NewArrival)}
                        onChange={(e) =>
                            handleChange(
                                "NewArrival",
                                e.target.checked
                            )
                        }
                        className="h-4 w-4"
                    />

                    <span className="text-sm text-gray-700 dark:text-gray-300">
                        New Arrival
                    </span>
                </label>
            </div>
        </div>
    );
}