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
        <div className="min-w-0 md:col-span-2">
            <div className="grid gap-4 sm:grid-cols-3">
                <label className="flex min-w-0 cursor-pointer items-center gap-3 rounded-lg border border-gray-200 bg-white p-4 transition hover:bg-gray-50 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800">
                    <input
                        type="checkbox"
                        checked={Boolean(product.isBestSeller)}
                        onChange={(e) =>
                            handleChange(
                                "isBestSeller",
                                e.target.checked
                            )
                        }
                        className="h-4 w-4 shrink-0 accent-blue-600"
                    />

                    <span className="text-sm text-gray-700 dark:text-gray-300">
                        Best Seller
                    </span>
                </label>

                <label className="flex min-w-0 cursor-pointer items-center gap-3 rounded-lg border border-gray-200 bg-white p-4 transition hover:bg-gray-50 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800">
                    <input
                        type="checkbox"
                        checked={Boolean(product.isSale)}
                        onChange={(e) =>
                            handleChange(
                                "isSale",
                                e.target.checked
                            )
                        }
                        className="h-4 w-4 shrink-0 accent-blue-600"
                    />

                    <span className="text-sm text-gray-700 dark:text-gray-300">
                        Sale
                    </span>
                </label>

                <label className="flex min-w-0 cusor-pointer items-center gap-3 rounded-lg border border-gray-200 bg-white p-4 transition hover:bg-gray-50 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800">
                    <input
                        type="checkbox"
                        checked={Boolean(product.NewArrival)}
                        onChange={(e) =>
                            handleChange(
                                "NewArrival",
                                e.target.checked
                            )
                        }
                        className="h-4 w-4 shrink-0 accent-blue-600"
                    />

                    <span className="text-sm text-gray-700 dark:text-gray-300">
                        New Arrival
                    </span>
                </label>
            </div>
        </div>
    );
}