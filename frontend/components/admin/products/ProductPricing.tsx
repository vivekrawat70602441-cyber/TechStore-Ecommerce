"use client";
interface ProductPricingProps {
    formData: {
        price: number;
        originalPrice: number;
        stock: number;
        discount: number;
    };

    handleChange: (
        e: React.ChangeEvent<
            HTMLInputElement |
            HTMLTextAreaElement |
            HTMLSelectElement
        >
    ) => void;
}

export default function ProductPricing({
    formData,
    handleChange,
}: ProductPricingProps) {
    return (
        <section className="rounded-xl bg-white p-6 shadow dark:bg-slate-900">

            <h2 className="mb-6 text-xl font-semibold text-gray-900 dark:text-white">
                Pricing & Inventory
            </h2>

            <div className="grid gap-5 md:grid-cols-2">

                {/* Price */}

                <div>

                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Selling Price
                    </label>

                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        min="0"
                        required
                        className="w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 outline-none focus:border-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    />

                </div>

                {/* Original Price */}

                <div>

                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Original Price
                    </label>

                    <input
                        type="number"
                        name="originalPrice"
                        value={formData.originalPrice}
                        onChange={handleChange}
                        min="0"
                        className="w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 outine-none focus:border-blue-600 dark:bg-slate-800 dark:text-white"
                    />

                </div>

                {/* Stock */}
                <div>

                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Stock
                    </label>

                    <input
                        type="number"
                        name="stock"
                        value={formData.stock}
                        onChange={handleChange}
                        min="0"
                        required
                        className="w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 outline-none focus:border-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    />

                </div>

                {/* Discount */}

                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Discount (%)
                    </label>

                    <input
                        type="number"
                        name="discount"
                        value={formData.discount}
                        onChange={handleChange}
                        min="0"
                        max="100"
                        className="w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 outline-none focus:border-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    />

                </div>

            </div>

        </section>
    );
}