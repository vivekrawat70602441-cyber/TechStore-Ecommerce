"use client";

import Image from "next/image";
import Link from "next/link";

import Container from "@/components/common/Container";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import Breadcrumb from "@/components/common/Breadcrumb";
import ScaleIn from "@/components/animations/ScaleIn";


export default function CartPage() {
    const {
        cart,
        totalItems,
        subtotal,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
    } = useCart();

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
                            label: "Cart",
                        },
                    ]}
                />

                <h1 className="mb-10 text-4xl font-bold text-gray-900 dark:text-white">
                    Shopping Cart
                </h1>

                {cart.length === 0 ? (
                    <div className="rounded-2xl border border-gray-200 bg-white py-16 text-center shadow-sm dark:border-slate-700 dark:bg-slate-900">

                        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-blue-100">

                            <ShoppingCart
                                size={42}
                                className="text-blue-600"
                            />

                        </div>

                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                            Your Cart is Empty
                        </h2>

                        <p className="mx-auto mt-4 max-w-md text-gray-500 dark:text-gray-400">
                            Looks like you haven&apos;t added any products yet.
                            Browse our latest collection and start shopping.
                        </p>

                        <Link
                            href="/products"
                            className="mt-8 inline-block rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700 cursor-pointer"
                        >
                            Continue Shopping
                        </Link>

                    </div>
                ) : (
                    <div className="grid gap-10 lg:grid-cols-3">
                        {/* Cart Items */}
                        <div className="space-y-6 lg:col-span-2">
                            {cart.map((item) => (
                                <div
                                    key={item._id}
                                    className="flex items-center gap-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-lg dark:border-slate-700 dark:bg-slate-900"
                                >
                                    <div className="h-28 w-28 overflow-hidden rounded-lg bg-gray-50 dark:bg-slate-800">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            width={120}
                                            height={120}
                                            className="h-full w-full rounded-lg object-contain"
                                        />
                                    </div>

                                    <div className="flex-1">
                                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                            {item.name}
                                        </h2>

                                        <p className="mt-1 text-gray-500 dark:text-gray-400">
                                            {item.brand}
                                        </p>

                                        <p className="mt-3 text-2xl font-bold text-blue-600 dark:text-blue-400">
                                            ₹{item.price.toLocaleString("en-IN")}
                                        </p>

                                        <div className="mt-4 flex items-center gap-4">
                                            <div className="flex items-center overflow-hidden rounded-lg border border-gray-300 dark:border-slate-700">

                                                <button
                                                    onClick={() => decreaseQuantity(item._id)}
                                                    className="p-2 transition hover:bg-gray-100 dark:hover:bg-slate-800 cursor-pointer"
                                                >
                                                    <Minus size={16} />
                                                </button>

                                                <span className="px-4 font-semibold text-gray-900 dark:text-white">
                                                    {item.quantity}
                                                </span>

                                                <button
                                                    onClick={() => increaseQuantity(item._id)}
                                                    className="p-2 transition hover:bg-gray-100 dark:hover:bg-slate-800 cursor-pointer"
                                                >
                                                    <Plus size={16} />
                                                </button>

                                            </div>

                                            <button
                                                onClick={() => {
                                                    setSelectedProductId(item._id);
                                                    setSelectedProductName(item.name);
                                                    setShowRemoveModal(true);
                                                }}

                                                className="flex items-center gap-2 text-red-600 hover:text-red-700 cursor-pointer"
                                            >
                                                <Trash2 size={18} />
                                                Remove
                                            </button>

                                        </div>

                                    </div>

                                </div>

                            ))}

                        </div>

                        {/* Order Summary */}
                        <div className="h-fit rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
                            <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
                                Order Summary
                            </h2>

                            <div className="mb-4 flex justify-between text-gray-600 dark:text-gray-300">
                                <span>Total Items</span>
                                <span>{totalItems}</span>
                            </div>

                            <div className="mb-6 flex justify-between text-xl font-bold text-gray-900 dark:text-white">
                                <span>Total</span>

                                <span>
                                    ₹{subtotal.toLocaleString("en-IN")}
                                </span>
                            </div>

                            <Link
                                href="/checkout"
                                className="block w-full rounded-xl bg-blue-600  py-3 text-center font-semibold text-white transition hover:bg-blue-700 cursor-pointer"
                            >
                                Proceed to Checkout
                            </Link>
                        </div>
                    </div>
                )}
            </Container>

            {showRemoveModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

                    <ScaleIn>

                        <div className="mx-4 w-full max-w-xs rounded-xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 p-5 shadow-2xl">

                            <h2 className="text-lg font-semibold text-center text-gray-900 dark:text-white">
                                Remove Product
                            </h2>

                            <p className="mt-3 text-sm leading-6 text-gray-500 text-center dark:text-gray-400">
                                Are you sure you want to remove{" "}
                                <span className="font-semibold text-gray-900 dark:text-white">
                                    {selectedProductName}
                                </span>
                                ?
                            </p>

                            <div className="mt-6 flex justify-center gap-3">

                                <button
                                    onClick={() => setShowRemoveModal(false)}
                                    className="rounded-lg border px-4 py-2 text-sm transition hover:bg-gray-100  dark:border-slate-700 dark:hover:bg-slate-800 cursor-pointer"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={() => {
                                        removeFromCart(selectedProductId);
                                        setShowRemoveModal(false);
                                    }}
                                    className="rounded-xl bg-red-600 px-4 py-2 text-sm  text-white transition hover:bg-red-700 cursor-pointer">
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