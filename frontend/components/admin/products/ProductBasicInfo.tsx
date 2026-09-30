"use client";
interface ProductBasicInfoProps {
    formData: {
        name: string;
        slug: string;
        brand: string;
        category: string;
        sku: string;
    };

    handleChange: (
        e: React.ChangeEvent<
           HTMLInputElement |
           HTMLTextAreaElement |
           HTMLSelectElement
        >
    ) => void;
}

export default function ProductBasicInfo({
    formData,
    handleChange,
}: ProductBasicInfoProps) {
    return (

        <section className="w-full min-w-0 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6 dark:border-slate-700 dark:bg-slate-900">

            <h2 className="mb-5 text-lg font-semibold text-gray-900 sm:mb-6 sm:text-xl dark:text-white">
                Basic Information
            </h2>

            <div className="grid min-w-0 grid-cols-1 gap-5 md:grid-cols-2">

                {/* Product Name */}

                <div className="min-w-0 md:col-span-2">

                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Product Name
                    </label>

                    <input
                      name="name"
                      value={formData.name} 
                      onChange={handleChange}
                      placeholder="Enter product name"
                      required
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-blue-600 sm:text-base dark:border-slate-700 dark:bg-slate-800 dark:text-white" 
                    />

                </div>

                {/* Slug */}

                <div className="min-w-0">

                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Slug
                    </label>

                    <input
                      name="slug"
                      value={formData.slug}
                      onChange={handleChange}
                      placeholder="gaming-laptop"
                      required
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-blue-600 sm:text-base dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    />

                </div>

                {/* Category */}

                <div className="min-w-0">

                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Category
                    </label>

                    <input
                      name="category"
                      value={formData.category}
                      onChange={handleChange} 
                      placeholder="Laptops"
                      required
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-blue-600 sm:text-base dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    />

                </div>

                {/* SKU */}

                <div className="min-w-0">

                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        SKU
                    </label>

                    <input
                      name="sku"
                      value={formData.sku}
                      onChange={handleChange}
                      placeholder="ASUS-ROG-001" 
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-blue-600 sm:text-base dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    />

                </div>

            </div>

        </section>
    );
}