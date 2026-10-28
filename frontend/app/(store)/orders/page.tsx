"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Container from "@/components/common/Container";
import Breadcrumb from "@/components/common/Breadcrumb";
import FadeUp from "@/components/animations/FadeUp";
import OrderCard from "@/components/orders/OrderCard";

import { FiPackage } from "react-icons/fi";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { authFetch } from "@/lib/authFetch";
import type { Order } from "@/types/OrderTypes";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function OrdersPage() {

    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchOrders = async () => {

            try {

                const response = await authFetch(
                    `${API}/orders`,
                    {
                        headers: {},
                    });

                const data = await response.json();

                if (response.ok) {
                    setOrders(data.orders);
                } else {
                    console.error("Failed to fetch orders:", data.message);
                }

            } catch (error) {
                console.error("Fetch orders error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();

    }, []);

    if (loading) {
        return (
            <main className="pt-28 pb-20">
                <Container>
                    <p className="text-center text-lg">
                        Loading Orders...
                    </p>
                </Container>
            </main>
        );
    }

    return (

        <ProtectedRoute>
            <main className="pt-28 pb-20">

                <Container>

                    <Breadcrumb
                        items={[
                            {
                                label: "Home",
                                href: "/",
                            },
                            {
                                label: "Orders",
                            },
                        ]}
                    />

                    <FadeUp>

                        {orders.length === 0 ? (

                            <div className="mx-auto max-w-3xl rounded-2xl border border-gray-200 bg-white py-16 text-center shadow-sm dark:border-slate-700 dark:bg-slate-900">

                                <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-blue-100 dark:bg-slate-800">

                                    <FiPackage
                                        size={42}
                                        className="text-blue-600"
                                    />

                                </div>

                                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                                    No Orders Yet
                                </h1>

                                <p className="mx-auto mt-4 max-w-md leading-7 text-gray-500 dark:text-gray-400">
                                    Looks like you haven&apos;t placed any orders yet.
                                </p>

                                <Link
                                    href="/products"
                                    className="mt-8 inline-block rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white"
                                >
                                    Start Shopping
                                </Link>

                            </div>
                        ) : (
                            <div className="space-y-6">
                                {orders.map((order) => (
                                    <OrderCard
                                        key={order._id}
                                        order={order}
                                    />
                                ))}
                            </div>
                        )}

                    </FadeUp>

                </Container>

            </main>

        </ProtectedRoute>
    );
}