"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Trash2 } from "lucide-react";
import { useState } from "react";
import Container from "@/components/common/Container";
import { useWishlist } from "@/context/WishlistContext";
import Breadcrumb from "@/components/common/Breadcrumb";
import ScaleIn from "@/components/animations/ScaleIn";

export default function WishlistPage() {
    const { wishlist, removeFromWishlist } = useWishlist();

    const [showRemoveModal, setShowRemoveModal] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState("");
    const [selectedProductName, setSelectedProductName] = useState("");


    return (
        <main className="pt-20 pb-20">
            <Container>

                <Breadcrumb
                    items={[
                        {
                            label: "Home",
                            href: "/",
                        },
                        {
                            label: "Wishlist",
                        },
                    ]}
                />

                <h1 className="mb-10 text-4xl font-bold">
                    My Wishlist
                </h1>

                {wishlist.length === 0 ? (
                    <div className="rounded-2xl border border-gray-200 bg-white py-16 text-center shadow-sm dark:border-slate-700 dark:bg-slate-900">

                        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-red-100">

                            <Heart
                                size={42}
                                className="text-red-500"
                            />

                        </div>

                        <h2 className="text-3xl font-bold">
                            Your Wishlist is Empty
                        </h2>

                        <p className="mx-auto mt-4 max-w-md text-gray-500 dark:text-gray-400">
                            Save your favourite products here.
                            Browse our latest collection and add the items you love.
                        </p>

                        <Link
                            href="/products"
                            className="mt-8 inline-block rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700 cursor-pointer"
                        >
                            Browse Products
                        </Link>

                    </div>
                ) : (
                    <div className="space-y-6">

                        {wishlist.map((item) => (
                            <div
                                key={item._id}
                                className="flex items-center gap-6 rounded-2xl border border-gray-200 p-5 dark:border-slate-700"
                            >

                                <div className="h-28 w-28 overflow-hidden rounded-lg bg-gray-50 dark:bg-slate-800">
                                    <Image
                                        src={item.product.image}
                                        alt={item.product.name}
                                        width={120}
                                        height={120}
                                        className="h-full w-full rounded-lg object-contain"
                                    />
                                </div>

                                <div className="flex-1">

                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                        {item.product.name}
                                    </h2>

                                    <p className="mt-1 text-gray-500 dark:text-gray-400">
                                        {item.product.brand}
                                    </p>

                                    <p className="mt-3 text-2xl font-bold text-blue-600">
                                        ₹{item.product.price.toLocaleString("en-IN")}
                                    </p>

                                </div>

                                <button
                                    onClick={() => {
                                        setSelectedProductId(item._id);
                                        setSelectedProductName(item.product.name);
                                        setShowRemoveModal(true);
                                    }}
                                    className="flex items-center gap-2 text-red-600 hover:text-red-700 cursor-pointer"
                                >
                                    <Trash2 size={18} />
                                    Remove
                                </button>

                            </div>
                        ))}

                    </div>
                )}

            </Container>

            {showRemoveModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

                    <ScaleIn>

                        <div className="mx-4 w-full max-w-xs rounded-xl bg-white p-5 shadow-2xl dark:bg-slate-900">

                            <h2 className="text-center text-lg font-semibold text-gray-900 dark:text-white">
                                Remove Product
                            </h2>

                            <p className="mt-3 text-center text-sm leading-6 text-gray-500 dark:text-gray-400">
                                Are you sure you want to remove{" "}
                                <span className="font-semibold text-black dark:text-white">
                                    {" "}{selectedProductName}
                                </span>
                                ?
                            </p>

                            <div className="mt-6 flex justify-center gap-3">

                                <button
                                    onClick={() => setShowRemoveModal(false)}
                                    className="rounded-lg border border-gray-300 px-4 py-2 text-sm transition hover:bg-gray-100 cursor-pointer dark:border-slate-700 dark:hover:bg-slate-800"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={async () => {
                                        await removeFromWishlist(selectedProductId);
                                        setShowRemoveModal(false);
                                    }}
                                    className="rounded-lg bg-red-600 px-4 py-2 text-sm text-white transition hover:bg-red-700 cursor-pointer"
                                >
                                    Remove
                                </button>

                            </div>

                        </div>

                    </ScaleIn>

                </div>

            )}

        </main>
    );
}