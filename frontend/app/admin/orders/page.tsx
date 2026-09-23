"use client";

import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { authFetch } from "@/lib/authFetch";

import OrdersHeader from "@/components/admin/orders/list/OrdersHeader";
import OrdersCount from "@/components/admin/orders/list/OrdersCount";
import OrdersLoading from "@/components/admin/orders/list/OrdersLoading";
import OrdersAccessDenied from "@/components/admin/orders/list/OrdersAccessDenied";
import OrdersError from "@/components/admin/orders/list/OrdersError";
import OrdersEmpty from "@/components/admin/orders/list/OrdersEmpty";
import OrdersTable from "@/components/admin/orders/list/OrdersTable";

import type { Order } from "@/types/OrderTypes";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function AdminOrdersPage() {
    const {
        token,
        loading: authLoading,
        isAdmin,
    } = useAuth();

    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);

    const fetchOrders = useCallback(async () => {
        if (!token) {
            return;
        }

        try {
            setLoading(true);
            setError("");

            const response = await authFetch(
                `${API}/orders/admin`,
                {
                    method: "GET",
                    headers: {
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to fetch orders"
                );
            }

            setOrders(data.orders || []);
        } catch (error) {
            console.error("Failed to fetch orders:", error);

            setError(
                error instanceof Error
                    ? error.message
                    : "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        if (!authLoading && token && isAdmin) {
            fetchOrders();
        }
    }, [authLoading, token, isAdmin, fetchOrders]);

    const handleStatusChange = async (
        orderId: string,
        status: Order["status"]
    ) => {
        if (!token) {
            return;
        }

        try {
            setUpdatingOrderId(orderId);

            const response = await authFetch(
                `${API}/orders/admin/${orderId}/status`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        status,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to update status"
                );
            }

            setOrders((previousOrders) =>
                previousOrders.map((order) =>
                    order._id === orderId
                        ? {
                            ...order,
                            status: data.order.status,
                        }
                        : order
                )
            );
        } catch (error) {
            console.error("Failed to update order status:", error);

            alert(
                error instanceof Error
                    ? error.message
                    : "Failed to update order status"
            );
        } finally {
            setUpdatingOrderId(null);
        }
    };

    if (authLoading || loading) {
        return <OrdersLoading />;
    }

    if (!isAdmin) {
        return <OrdersAccessDenied />;
    }

    if (error) {
        return (
            <OrdersError
                message={error}
                onRetry={fetchOrders}
            />
        );
    }

    return (
        <main className="p-6">
            <OrdersHeader onRefresh={fetchOrders} />

            <OrdersCount count={orders.length} />

            {orders.length === 0 ? (
                <OrdersEmpty />
            ) : (
                <OrdersTable
                    orders={orders}
                    updatingOrderId={updatingOrderId}
                    onStatusChange={handleStatusChange}
                />
            )}
        </main>
    );
}
