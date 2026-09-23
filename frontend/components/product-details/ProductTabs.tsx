"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { Product } from "@/types/product";

const tabs = ["Description", "Specifications", "Reviews"];

interface ProductTabsProps {
    product: Product;
}

export default function ProductTabs({
    product,
}: ProductTabsProps) {
    const [activeTab, setActiveTab] = useState("Description");

    return (
        <section className="mt-16">
            {/*Tab Buttons */}

            <div className="flex border-b border-gray-200 dark:border-slate-700">

                {tabs.map((tab) => (

                    <motion.button
                        key={tab}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => setActiveTab(tab)}
                        className={`relative px-6 py-4 font-semibold transition-colors duration-300 ${activeTab === tab
                            ? " text-blue-600 dark:text-blue-400"
                            : "text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white"
                            }`}
                    >
                        {tab}

                        {activeTab === tab && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute bottom-0 left-0 h-0.5 w-full bg-blue-600"
                            />
                        )}

                    </motion.button>

                ))}

            </div>

            {/* Animated Content */}
            <div className="overflow-hidden rounded-b-2xl border border-t-0 border-gray-200 bg-white p-8 transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900">

                <AnimatePresence mode="wait">
                    {activeTab === "Description" && (

                        <motion.div
                            key="description"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <p className="leading-8 text-gray-600 dark:text-gray-300">
                                {product.description}
                            </p>
                        </motion.div>
                    )}

                    {activeTab === "Specifications" && (

                        <motion.div
                            key="specifications"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-4 text-gray-800 dark:text-gray-200"
                        >
                            <div className="flex justify-between border-b border-gray-200 pb-2 dark:border-slate-700">
                                <span>Brand</span>
                                <span>{product.brand}</span>
                            </div>

                            <div className="flex justify-between border-b border-gray-200 pb-2 dark:border-slate-700">
                                <span>Category</span>
                                <span>{product.category}</span>
                            </div>

                            <div className="flex justify-between border-b border-gray-200 pb-2 dark:border-slate-700">
                                <span>SKU</span>
                                <span>{product.sku}</span>
                            </div>

                            <div className="flex justify-between">
                                <span>Availability</span>
                                <span>
                                    {product.stock > 0
                                        ? `${product.stock} Available`
                                        : "Out of Stock"}
                                </span>
                            </div>

                        </motion.div>

                    )}

                    {activeTab === "Reviews" && (

                        <motion.div
                            key="reviews"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-5"
                        >

                            <div className="rounded-xl border border-gray-200 p-5 dark:border-slate-700">

                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Customer Rating
                                </h3>
                                <h4 className="font-semibold text-gray-900 dark:text-white">
                                    Rahul Sharma
                                </h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    ⭐{product.rating} / 5
                                </p>

                                <p className="mt-2 text-gray-600 dark:text-gray-300">
                                    Excellent laptop for programming and video editing.
                                    Based on {product.reviews} reviews.
                                </p>

                            </div>

                            <div className="rounded-xl border border-dashed border-gray-300 p-5 text-center dark:border-slate-700">
                                <p className="text-gray-500 dark:text-gray-400">
                                    Customer reviews will be available after backend integration.
                                </p>
                            </div>

                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}