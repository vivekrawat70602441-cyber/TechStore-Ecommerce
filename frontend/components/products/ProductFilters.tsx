"use client";

import FadeUp from "../animations/FadeUp";
import type { Product } from "@/types/product";

interface ProductFiltersProps {
    products: Product[];

    selectedCategory: string;
    setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;

    selectedBrand: string;
    setSelectedBrand: React.Dispatch<React.SetStateAction<string>>;

    maxPrice: number;
    setMaxPrice: React.Dispatch<React.SetStateAction<number>>;
}

export default function ProductFilters({
    products,
    selectedCategory,
    setSelectedCategory,
    selectedBrand,
    setSelectedBrand,
    maxPrice,
    setMaxPrice,
}: ProductFiltersProps) {

    const categories = [
        ...new Set(products.map((product) => product.category)),
    ];

    const brands = [
        ...new Set(products.map((product) => product.brand)),
    ]
    return (

        <FadeUp>

            <aside className=" rounded-2xl border bg-white p-6 shadow-sm transition-colors dark:border-slate-700 dark:bg-slate-900">

                <h2 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    Filters
                </h2>

                {/* Categories */}

                <div className="mb-8">

                    <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                        Categories
                    </h3>

                    <div className="space-y-3">

                        {/* All Categories */}

                        <label className="flex cursor-pointer items-center justify-between rounded-lg p-2 transition hover:bg-gray-100 dark:hover:bg-slate-800">

                            <div className="flex items-center gap-3">

                                <input
                                    type="radio"
                                    name="category"
                                    checked={selectedCategory === ""}
                                    onChange={() => setSelectedCategory("")}
                                    style={{ accentColor: "#2563eb" }}
                                />

                                <span className="text-gray-700 dark:text-gray-200">
                                    All Categories
                                </span>

                            </div>

                            <span className="text-sm text-gray-500">
                                ({products.length})
                            </span>

                        </label>

                        {/* Dynamic Categories */}

                        {categories.map((category) => {

                            const count = products.filter(
                                (product) => product.category === category
                            ).length;

                            return (
                                <label
                                    key={category}
                                    className="flex cursor-pointer items-center justify-between rounded-lg p-2 transition hover:bg-gray-100 dark:hover:bg-slate-800"
                                >

                                    <div className="flex items-center gap-3">

                                        <input
                                            type="radio"
                                            name="category"
                                            checked={selectedCategory === category}
                                            onChange={() =>
                                                setSelectedCategory(category)
                                            }
                                            style={{ accentColor: "#2563eb" }}
                                        />

                                        <span className="text-gray-700 dark:text-gray-200">
                                            {category}
                                        </span>

                                    </div>

                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                        ({count})
                                    </span>

                                </label>
                            );

                        })}
                    </div>
                </div>

                {/* Brands */}

                <div className="mb-8">

                    <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                        Brands
                    </h3>

                    <div className="space-y-3">

                        {/* All Brands */}

                        <label className="flex cursor-pointer items-center justify-between rounded-lg p-2 transition hover:bg-gray-100 dark:hover:bg-slate-800">

                            <div className="flex items-center gap-3">

                                <input
                                    type="radio"
                                    name="brand"
                                    checked={selectedBrand === ""}
                                    onChange={() => setSelectedBrand("")}
                                    style={{ accentColor: "#2563eb" }}
                                />

                                <span className="text-gray-700 dark:text-gray-200">
                                    All Brands
                                </span>

                            </div>

                            <span className="text-sm text-gray-500">
                                ({products.length})
                            </span>

                        </label>
                        {/* Dynamic Brands */}

                        {brands.map((brand) => {

                            const count = products.filter(
                                (product) => product.brand === brand
                            ).length;

                            return (

                                <label
                                    key={brand}
                                    className="flex cursor-pointer items-center justify-between rounded-lg p-2 transition hover:bg-gray-100 dark:hover:bg-slate-800">

                                    <div className="flex items-center gap-3">

                                        <input
                                            type="radio"
                                            name="brand"
                                            checked={selectedBrand === brand}
                                            onChange={() => setSelectedBrand(brand)}
                                            style={{ accentColor: "#2563eb" }}
                                        />

                                        <span className="text-gray-700 dark:text-gray-200">
                                            {brand}
                                        </span>

                                    </div>

                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                        ({count})
                                    </span>

                                </label>

                            );

                        })}
                    </div>

                </div>

                {/* Price */}

                <div>
                    <h3 className="mb-3 font-semibold text-gray-900 dark:text-white">
                        Price Range
                    </h3>

                    <input
                        type="range"
                        min="1000"
                        max="200000"
                        step="1000"
                        value={maxPrice}
                        onChange={(e) =>
                            setMaxPrice(Number(e.target.value))
                        }
                        className="w-full accent-blue-600"
                    />

                    <div className="mt-3 flex justify-between text-sm text-gray-500 dark:text-gray-400">
                        <span>₹1000</span>

                        <span>
                            ₹{maxPrice.toLocaleString("en-IN")}
                        </span>

                    </div>

                </div>

            </aside>

        </FadeUp>
    );
} 