"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Container from "@/components/common/Container";
import Breadcrumb from "@/components/common/Breadcrumb";
import FadeUp from "@/components/animations/FadeUp";

import { FiPackage } from "react-icons/fi";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { authFetch } from "@/lib/authFetch";

const API = process.env.NEXT_PUBLIC_API_URL;

interface Order {
    _id: string;
    totalPrice: number;
    status: string;
    createdAt: string;

    products: {
        quantity: number;
        price: number;

        product: {
            _id: string;
            name: string;
            image: string;
        };
    }[];
}

export default function OrdersPage() {

    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchOrders = async () => {

            try {

                const response = await authFetch(
                    `${API}/orders`,
                    {
                        headers: {
                        },
                    }
                );

                const data = await response.json();

                if (response.ok) {
                    setOrders(data.orders);
                }

            } catch (error) {
                console.error(error);
            }

            setLoading(false);
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

                                    <div
                                        key={order._id}
                                        className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900"
                                    >
                                        <div className="flex items-center justify-between">

                                            <div>
                                                <h2 className="text-xl font-bold dark:text-white">
                                                    Order #{order._id.slice(-6)}
                                                </h2>

                                                <p className="text-sm text-gray-500">

                                                    {new Date(
                                                        order.createdAt
                                                    ).toLocaleDateString()}

                                                </p>

                                            </div>

                                            <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
                                                {order.status}
                                            </span>

                                        </div>

                                        <div className="mt-6 space-y-4">
                                            {order.products.map((item) => (

                                                <div
                                                    key={item.product._id}
                                                    className="flex items-center gap-4"
                                                >

                                                    <Image
                                                        src={item.product.image}
                                                        alt={item.product.name}
                                                        width={80}
                                                        height={80}
                                                        className="h-20 w-20 rounded-xl object-cover"
                                                    />

                                                    <div className="flex-1">

                                                        <h3 className="font-semibold dark:text-white">
                                                            {item.product.name}
                                                        </h3>

                                                        <p className="text-gray-500">
                                                            Qty : {item.quantity}
                                                        </p>

                                                    </div>

                                                    <div className="font-bold dark:text-white">
                                                        ₹{item.price.toLocaleString("en-IN")}
                                                    </div>

                                                </div>

                                            ))}

                                        </div>

                                        <div className="mt-6 border-t pt-4 text-right">

                                            <span className="text-xl font-bold text-blue-600">
                                                Total ₹{order.totalPrice.toLocaleString("en-IN")}
                                            </span>

                                        </div>

                                    </div>
                                ))}

                            </div>
                        )}

                    </FadeUp>

                </Container>

            </main>

        </ProtectedRoute>
    );
}