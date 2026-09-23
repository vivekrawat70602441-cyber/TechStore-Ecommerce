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

        <section className="rounded-xl bg-white p-6 shadow dark:bg-slate-900">

            <h2 className="mb-6 text-xl font-semibold text-gray-900 dark:text-white">
                Basic Information
            </h2>

            <div className="grid gap-5 md:grid-cols-2">

                {/* Product Name */}

                <div className="md:col-span-2">

                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Product Name
                    </label>

                    <input
                      name="name"
                      value={formData.name} 
                      onChange={handleChange}
                      placeholder="Enter product name"
                      required
                      className="w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 outline-none focus:border-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-white" 
                    />

                </div>

                {/* Slug */}

                <div>

                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Slug
                    </label>

                    <input
                      name="slug"
                      value={formData.slug}
                      onChange={handleChange}
                      placeholder="gaming-laptop"
                      required
                      className="w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 outline-none focus:border-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    />

                </div>

                {/* Category */}

                <div>

                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Category
                    </label>

                    <input
                      name="category"
                      value={formData.category}
                      onChange={handleChange} 
                      placeholder="Laptops"
                      required
                      className="w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 outline-none focus:border-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    />

                </div>

                {/* SKU */}

                <div>

                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        SKU
                    </label>

                    <input
                      name="sku"
                      value={formData.sku}
                      onChange={handleChange}
                      placeholder="ASUS-ROG-001" 
                      className="w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 outline-none focus:border-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    />

                </div>

            </div>

        </section>
    );
}