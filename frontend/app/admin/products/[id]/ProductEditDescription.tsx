"use client";

import type { Product } from "@/types/product";

interface ProductEditDescriptionProps {
    product: Product;

    handleChange: (
        field: keyof Product,
        value: Product[keyof Product]
    ) => void;
}

export default function ProductEditDescription({
    product,
    handleChange,
}: ProductEditDescriptionProps) {
    return (
        <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Description
            </label>

            <textarea
                rows={6}
                value={product.description}
                onChange={(e) =>
                    handleChange(
                        "description",
                        e.target.value
                    )
                }
                placeholder="Describe the product..."
                className="w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
        </div>
    );
}