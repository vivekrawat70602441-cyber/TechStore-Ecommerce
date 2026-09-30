"use client";

interface ProductStatusProps {
    formData: {
        isBestSeller: boolean;
        isSale: boolean;
        NewArrival: boolean;
    };

    handleCheckboxChange: (
        e: React.ChangeEvent<HTMLInputElement>
    ) => void;
}

export default function ProductStatus({
    formData,
    handleCheckboxChange,
}: ProductStatusProps) {
    return (
        <section className="w-full min-w-0 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6 dark:border-slate-700 dark:bg-slate-900">

            <h2 className="mb-5 text-lg font-semibold text-gray-900 sm:mb-6 sm:text-xl dark:text-white">
                Product Status
            </h2>

            <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">

                {/* Best Seller */}

                <label className="flex min-w-0 cursor-pointer items-center gap-3 rounded-lg border border-gray-200 bg-white p-4 transition hover:bg-gray-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700">

                    <input
                        type="checkbox"
                        name="isBestSeller"
                        checked={formData.isBestSeller}
                        onChange={handleCheckboxChange}
                        className="h-4 w-4 shrink-0 accent-blue-600"
                    />

                    <span className="text-sm text-gray-700 dark:text-gray-300">
                        Best Seller
                    </span>

                </label>

                {/* Sale */}

                <label className="flex min-w-0 cursor-pointer items-center gap-3 rounded-lg border-gray-200 bg-white p-4 transition hover:bg-gray-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700">

                    <input
                        type="checkbox"
                        name="isSale"
                        checked={formData.isSale}
                        onChange={handleCheckboxChange}
                        className="h-4 w-4 shrink-0 accent-blue-600"
                    />

                    <span className="text-sm text-gray-700 dark:text-gray-300">
                        On Sale
                    </span>

                </label>

                {/* New Arrival */}

                <label className="flex min-w-0 cursor-pointer items-center gap-3 rounded-lg border border-gray-200 bg-white p-4 transition hover:bg-gray-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700">

                    <input
                        type="checkbox"
                        name="NewArrival"
                        checked={formData.NewArrival}
                        onChange={handleCheckboxChange}
                        className="h-4 w-4 shrink-0 accent-blue-600"
                    />

                    <span className="text-sm text-gray-700 dark:text-gray-300">
                        New Arrival
                    </span>

                </label>

            </div>

        </section>
    );
}