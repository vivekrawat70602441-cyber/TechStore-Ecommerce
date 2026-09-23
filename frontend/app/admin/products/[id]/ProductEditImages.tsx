"use client";

import type { Product } from "@/types/product";

interface ProductEditImagesProps {
    product: Product;

    handleChange: (
        field: keyof Product,
        value: Product[keyof Product]
    ) => void;
}

export default function ProductEditImages({
    product,
    handleChange,
}: ProductEditImagesProps) {
    return (
        <>
            <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Main Image URL
                </label>

                <input
                    type="text"
                    value={product.image}
                    onChange={(e) =>
                        handleChange("image", e.target.value)
                    }
                    placeholder="/products/laptop.jpg"
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
            </div>

            <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Additional Image URLs
                </label>

                <textarea
                    rows={4}
                    value={product.images.join(", ")}
                    onChange={(e) => {
                        const images = e.target.value
                            .split(", ")
                            .map((image) => image.trim())
                            .filter(Boolean);

                        handleChange("images", images);
                    }}

                    placeholder="/products/laptop-1.jpg, /products/laptop-2.jpg"
                    className="w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />

                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Separate multiple image URLs with commas.
                </p>
            </div>
        </>
    );
}