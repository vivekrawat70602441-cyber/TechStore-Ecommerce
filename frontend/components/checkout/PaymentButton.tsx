
"use client";

import { useState } from "react";
import { authFetch } from "@/lib/authFetch";

import type {
    CreatePaymentOrderRequest,
    CreatePaymentOrderResponse,
    RazorpayOptions,
    RazorpayPaymentResponse,
    VerifyPaymentRequest,
    VerifyPaymentResponse,
    ShippingAddress,
    PaymentProduct,
} from "@/types/PaymentTypes";

interface PaymentButtonProps {
    products: PaymentProduct[];
    shippingAddress: ShippingAddress;
}

interface RazorpayInstance {
    open: () => void;
}

declare global {
    interface Window {
        Razorpay: new (
            options: RazorpayOptions
        ) => RazorpayInstance;

    }
}

const API = process.env.NEXT_PUBLIC_API_URL;

export default function PaymentButton({
    products,
    shippingAddress,
}: PaymentButtonProps) {
    const [loading, setLoading] = useState(false);

    const loadRazorpayScript = (): Promise<boolean> => {
        return new Promise((resolve) => {
            // Already loaded
            if (window.Razorpay) {
                resolve(true);
                return;
            }

            // Script already exists but is still loading
            const existingScript = document.querySelector(
                'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
            );

            if (existingScript) {
                existingScript.addEventListener("load", () => {
                    resolve(true);
                });

                existingScript.addEventListener("error", () => {
                    resolve(false);
                });

                return;
            }

            const script = document.createElement("script");

            script.src =
                "https://checkout.razorpay.com/v1/checkout.js";

            script.async = true;

            script.onload = () => {
                resolve(true);
            };

            script.onerror = () => {
                resolve(false);
            };

            document.body.appendChild(script);
        });
    };

    const handlePayment = async () => {
        if (loading) return;

        try {
            setLoading(true);

            if (!API) {
                alert("API URL is not configured.");
                setLoading(false);
                return;
            }

            if (!products || products.length === 0) {
                alert("Your cart is empty.");
                setLoading(false);
                return;
            }

            // -----------------------------------------
            // STEP 1: Prepare create-order request
            // -----------------------------------------

            const createOrderRequest: CreatePaymentOrderRequest = {
                products,
                shippingAddress,
            };

            // -----------------------------------------
            // STEP 2: Ask backend to create Razorpay order
            // -----------------------------------------

            const response = await authFetch(
                `${API}/payments/create-order`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(createOrderRequest),
                }
            );

            const data: CreatePaymentOrderResponse =
                await response.json();

            if (!response.ok) {
                alert(
                    data.message ||
                    "Failed to create payment order."
                );
                return;
            }

            // -----------------------------------------
            // STEP 3: Load Razorpay Checkout
            // -----------------------------------------

            const razorpayLoaded =
                await loadRazorpayScript();

            if (!razorpayLoaded || !window.Razorpay) {
                alert(
                    "Razorpay failed to load. Please try again."
                );
                return;
            }

            // -----------------------------------------
            // STEP 4: Configure Razorpay Checkout
            // -----------------------------------------

            const options: RazorpayOptions = {
                key: data.key,

                // Razorpay expects paise.
                // Backend already sends amount in paise.
                amount: data.amount,

                currency: data.currency,

                name: "Your Ecommerce Store",

                description: "Ecommerce Order",

                order_id: data.razorpayOrderId,

                prefill: {
                    name: shippingAddress.fullName,
                    email: shippingAddress.email,
                    contact: shippingAddress.phone,
                },

                // -----------------------------------------
                // STEP 5: Razorpay payment successful
                // -----------------------------------------

                handler: async (
                    paymentResponse: RazorpayPaymentResponse
                ) => {
                    try {
                        // -----------------------------------------
                        // STEP 6: Prepare verification request
                        // -----------------------------------------

                        const verifyRequest: VerifyPaymentRequest = {
                            razorpay_payment_id:
                                paymentResponse.razorpay_payment_id,

                            razorpay_order_id:
                                paymentResponse.razorpay_order_id,

                            razorpay_signature:
                                paymentResponse.razorpay_signature,

                            products,

                            shippingAddress,
                        };

                        // -----------------------------------------
                        // STEP 7: Verify payment on backend
                        // -----------------------------------------

                        const verifyResponse =
                            await authFetch(
                                `${API}/payments/verify`,
                                {
                                    method: "POST",

                                    headers: {
                                        "Content-Type":
                                            "application/json",

                                    },

                                    body: JSON.stringify(
                                        verifyRequest
                                    ),
                                }
                            );

                        const verifyData: VerifyPaymentResponse =
                            await verifyResponse.json();

                        if (!verifyResponse.ok) {
                            alert(
                                verifyData.message ||
                                "Payment verification failed."
                            );
                            return;
                        }

                        // -----------------------------------------
                        // STEP 8: Payment + order successful
                        // -----------------------------------------

                        alert(
                            "Payment successful! Order placed successfully."
                        );

                        window.location.href = "/orders";
                    } catch (error) {
                        console.error(
                            "Payment verification error:",
                            error
                        );

                        alert(
                            "Payment was completed, but order verification failed. Please contact support."
                        );
                    } finally {
                        setLoading(false);
                    }
                },

                // -----------------------------------------
                // Razorpay modal
                // -----------------------------------------

                modal: {
                    confirm_close: true,

                    escape: true,

                    backdropclose: false,

                    animation: true,

                    ondismiss: () => {
                        console.log(
                            "Razorpay checkout closed."
                        );

                        setLoading(false);
                    },
                },

                // -----------------------------------------
                // Checkout theme
                // -----------------------------------------

                theme: {
                    color: "#2563eb",
                },
            };

            // -----------------------------------------
            // STEP 9: Open Razorpay
            // -----------------------------------------

            const razorpay =
                new window.Razorpay(options);

            razorpay.open();
        } catch (error) {
            console.error(
                "Payment initiation error:",
                error
            );

            alert(
                "Something went wrong while starting payment."
            );

            setLoading(false);
        }
    };

    return (
        <button
            type="button"
            onClick={handlePayment}
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
            {loading ? "Processing..." : "Pay Now"}
        </button>
    );
}

