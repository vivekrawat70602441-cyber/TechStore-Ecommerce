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
        <section className="rounded-xl bg-white p-6 shadow dark:bg-slate-900">

            <h2 className="mb-6 text-xl font-semibold text-gray-900 dark:text-white">
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
                    placeholder="/products/laptop.jgp"
                    className="w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 outline-none focus:border-blue-600 dark:borde-slate-700 dark:bg-slate-800 dark:text-white"
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
                    className="w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 outline-none focus:border-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />

                <p className="mt-2">
                    Separate multiple image URL&apos;s with commas.
                </p>

            </div>

        </section>
    );
}