"use client";

import Script from "next/script";
import Container from "@/components/common/Container";
import BillingForm from "@/components/checkout/BillingForm";
import OrderSummary from "@/components/checkout/OrderSummary";
import Breadcrumb from "@/components/common/Breadcrumb";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { authFetch } from "@/lib/authFetch";
import type {
    CreatePaymentOrderRequest,
    CreatePaymentOrderResponse,
    RazorpayOptions,
    RazorpayPaymentResponse,
    ShippingAddress,
    VerifyPaymentRequest,
    VerifyPaymentResponse,
} from "@/types/PaymentTypes";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function CheckoutPage() {

    const router = useRouter();

    const [billingData, setBillingData] = useState<ShippingAddress>({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
    });

    const {
        cart,
        clearCart,
    } = useCart();

    const handlePlaceOrder = async () => {
        if (
            !billingData.fullName.trim() ||
            !billingData.email.trim() ||
            !billingData.phone.trim() ||
            !billingData.address.trim() ||
            !billingData.city.trim() ||
            !billingData.state.trim() ||
            !billingData.pincode.trim()
        ) {
            alert("Please fill all billing details.");
            return;
        }

        if (cart.length === 0) {
            alert("Your cart is empty.");
            return;
        }

        try {
            const orderData: CreatePaymentOrderRequest = {
                products: cart.map((item) => ({
                    product: item._id,
                    quantity: item.quantity,
                })),
                shippingAddress: {
                    fullName: billingData.fullName.trim(),
                    email: billingData.email.trim(),
                    phone: billingData.phone.trim(),
                    address: billingData.address.trim(),
                    city: billingData.city.trim(),
                    state: billingData.state.trim(),
                    pincode: billingData.pincode.trim(),
                },
            };

            const response = await authFetch(`${API}/payments/create-order`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(orderData),
            });

            const data: CreatePaymentOrderResponse = await response.json();
            if (!response.ok) {
                alert(data.message || "Failed to create payment order.");
                return;
            }

            if (!window.Razorpay) {
                alert("Razorpay failed to load. Please try again.");
                return;
            }

            const options: RazorpayOptions = {
                key: data.key,
                amount: data.amount,
                currency: data.currency,
                name: "My Ecommerce Store",
                description: "Ecommerce Order",
                order_id: data.razorpayOrderId,
                prefill: {
                    name: billingData.fullName,
                    email: billingData.email,
                    contact: billingData.phone,
                },
                handler: async function (
                    paymentResponse: RazorpayPaymentResponse
                ) {
                    try {

                        const verifyPayload: VerifyPaymentRequest = {
                            razorpay_payment_id: paymentResponse.razorpay_payment_id,
                            razorpay_order_id: paymentResponse.razorpay_order_id,
                            razorpay_signature: paymentResponse.razorpay_signature,
                            products: orderData.products,
                            shippingAddress: orderData.shippingAddress,
                        };

                        const verifyResponse = await authFetch(
                            `${API}/payments/verify`,
                            {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },

                                body: JSON.stringify(
                                    verifyPayload
                                ),
                            }
                        );

                        const verifyData: VerifyPaymentResponse =
                            await verifyResponse.json();

                        if (!verifyResponse.ok) {
                            alert(verifyData.message || "Payment verification failed.");
                            return;
                        }

                        alert("Payment successful! Order placed successfully.");

                        clearCart();

                        router.push("/orders");

                    } catch (error) {
                        console.error("Payment verification error:", error);
                        alert("Payment verification failed.");
                    }
                },

                modal: {
                    ondismiss: function () {
                        console.log("Razorpay checkout closed.");
                    },
                },

                theme: {
                    color: "#2563eb",
                },
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();
        } catch (error) {
            console.error("Payment intitiation error:", error);
            alert("Something went wrong while starting payment.");
        }
    };

    return (
        <>

            <Script
                src="https://checkout.razorpay.com/v1/checkout.js"
                strategy="afterInteractive"
            />

            <ProtectedRoute>

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
                                    href: "/cart",
                                },
                                {
                                    label: "Checkout",
                                },
                            ]}
                        />

                        <h1 className="mb-10 text-4xl font-bold text-gray-900 dark:text-white">
                            Checkout
                        </h1>

                        {/* Main Layout */}
                        <div className="grid gap-10 lg:grid-cols-3">

                            {/* Left Side */}
                            <div className="lg:col-span-2">
                                <BillingForm
                                    billingData={billingData}
                                    setBillingData={setBillingData}
                                />
                            </div>

                            {/* Right Side */}
                            <OrderSummary
                                billingData={billingData}
                                onPlaceOrder={handlePlaceOrder}
                            />


                        </div>

                    </Container>
                </main>

            </ProtectedRoute>
        </>
    );
}
