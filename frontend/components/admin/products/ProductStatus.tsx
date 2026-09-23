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
        <section className="rounded-xl bg-white p-6 shadow dark:bg-slate-900">

            <h2 className="mb-6 text-xl font-semibold text-gray-900 dark:text-white">
                Product Status
            </h2>

            <div className="space-y-4">

                {/* Best Seller */}

                <label className="flex items-center gap-3">

                    <input
                        type="checkbox"
                        name="isBestSeller"
                        checked={formData.isBestSeller}
                        onChange={handleCheckboxChange}
                        className="h-4 w-4"
                    />

                    <span className="text-gray-700 dark:text-gray-300">
                        Best Seller
                    </span>

                </label>

                {/* Sale */}

                <label className="flex items-center gap-3">

                    <input
                        type="checkbox"
                        name="isSale"
                        checked={formData.isSale}
                        onChange={handleCheckboxChange}
                        className="h-4 w-4"
                    />

                    <span className="text-gray-700 dark:text-gray-300">
                        On Sale
                    </span>

                </label>

                {/* New Arrival */}

                <label className="flex items-center gap-3">

                    <input
                        type="checkbox"
                        name="NewArrival"
                        checked={formData.NewArrival}
                        onChange={handleCheckboxChange}
                        className="h-4 w-4"
                    />

                    <span className="text-gray-700 dark:text-gray-300">
                        New Arrival
                    </span>

                </label>

            </div>

        </section>
    );
}