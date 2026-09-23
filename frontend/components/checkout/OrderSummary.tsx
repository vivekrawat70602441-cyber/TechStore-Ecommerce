"use client";

import { useCart } from "@/context/CartContext";
import type { ShippingAddress } from "@/types/PaymentTypes";

interface OrderSummaryProps {
    billingData: ShippingAddress;
    onPlaceOrder: () => void;
}

export default function OrderSummary({
    onPlaceOrder,
}: OrderSummaryProps) {

    const { subtotal, totalItems } = useCart();

    const shipping =
        subtotal === 0
            ? 0
            : subtotal >= 50000
                ? 0
                : 499;

    const tax = Number((subtotal * 0.18).toFixed(2));
    const total = Number((subtotal + shipping + tax).toFixed(2));

    return (
        <div className="h-fit rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
                Order Summary
            </h2>

            <div className="space-y-4">

                <div className="flex items-center justify-between text-gray-600 dark:text-gray-300">
                    <span>Items</span>
                    <span className="font-medium">{totalItems}</span>
                </div>

                <div className="flex items-center justify-between text-gray-600 dark:text-gray-300">
                    <span>Subtotal</span>

                    <span className="font-medium">
                        ₹{subtotal.toLocaleString("en-IN")}
                    </span>
                </div>

                <div className="flex items-center justify-between text-gray-600 dark:text-gray-300">
                    <span>Shipping</span>

                    <span className="font-medium text-green-600 dark:text-green-400">
                        {shipping === 0
                            ? "Free"
                            : `₹${shipping.toLocaleString("en-IN")}`}
                    </span>
                </div>

                <div className="flex items-center justify-between text-gray-600 dark:text-gray-300">
                    <span>GST (18%)</span>

                    <span className="font-medium">
                        ₹{tax.toLocaleString("en-IN")}
                    </span>
                </div>

                <div className="border-t border-gray-200 pt-4 dark:border-slate-700">

                    <div className="flex items-center justify-between text-xl font-bold text-gray-900 dark:text-white">

                        <span>Total</span>

                        <span className="text-blue-600 dark:text-blue-400">
                            ₹{total.toLocaleString("en-IN")}
                        </span>

                    </div>

                </div>

            </div>

            <button
              onClick={onPlaceOrder}
              className="mt-6 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-black-700"
            >
                Place Order
            </button>

            <div className="mt-6 rounded-xl bg-blue-50 p-4 text-sm text-blue-700 dark:bg-blue-900/20 dark:text-blue-300">
                🚚 Free shipping on orders above ₹50,000
            </div>

        </div>
    );
}