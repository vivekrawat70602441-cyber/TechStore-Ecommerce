"use client";

interface ProductImagesProps {
    formData: {
        image: string;
        images: string;
    };

    handleChange: (
        e: React.ChangeEvent<
            HTMLInputElement |
            HTMLTextAreaElement |
            HTMLSelectElement
        >
    ) => void;
}

export default function ProductImages({
    formData,
    handleChange,
}: ProductImagesProps) {
    return (
        <section className="w-full min-w-0 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6 dark:border-slate-700 dark:bg-slate-900">

            <h2 className="mb-5 text-lg font-semibold text-gray-900 sm:mb-6 sm:text-xl dark:text-white">
                Product Images
            </h2>

            {/* Main Image */}

            <div className="mb-5">

                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Main Image URL
                </label>

                <input
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="/products/laptop.jpg"
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-blue-600 sm:text-base dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />

            </div>

            {/* Additional Images */}

            <div>

                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Additional Image URLs
                </label>

                <textarea
                    name="images"
                    value={formData.images}
                    onChange={handleChange}
                    rows={4}
                    placeholder="/products/laptop-1.jpg, /products/laptop-2.jpg"
                    className="w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-blue-600 sm:text-base dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />

                <p className="mt-2 text-xs leading-5 text-gray-500 sm:text-sm dark:text-gray-400">
                    Separate multiple image URL&apos;s with commas.
                </p>

            </div>

        </section>
    );
}