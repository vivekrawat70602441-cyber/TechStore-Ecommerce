"use client";

import type { Product } from "@/types/product";

interface ProductEditBasicInfoProps {
    product: Product;
    handleChange: (
        field: keyof Product,
        value: Product[keyof Product]
    ) => void;
}

export default function ProductEditBasicInfo({
    product,
    handleChange,
}: ProductEditBasicInfoProps) {
    return (
        <>
            <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Product Name
                </label>

                <input
                    type="text"
                    value={product.name}
                    onChange={(e) =>
                        handleChange("name", e.target.value)
                    }
                    required
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium tet-gray-700 dark:text-gray-300">
                    Brand
                </label>

                <input
                    type="text"
                    value={product.brand}
                    onChange={(e) =>
                        handleChange("brand", e.target.value)
                    }
                    required
                    className='w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white'
                />
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Slug
                </label>

                <input
                    type="text"
                    value={product.slug}
                    onChange={(e) =>
                        handleChange("slug", e.target.value)
                    }
                    required
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Category
                </label>

                <input
                    type="text"
                    value={product.category}
                    onChange={(e) =>
                        handleChange("category", e.target.value)
                    }
                    required
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
            </div>

            <div>
                <label className="mb-2">
                    SKU
                </label>

                <input
                    type="text"
                    value={product.sku}
                    onChange={(e) =>
                        handleChange("sku", e.target.value)
                    }
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
            </div>
        </>
    );
}