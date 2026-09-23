"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { useAuth } from "@/context/AuthContext";
import { authFetch } from "@/lib/authFetch";
import type { Order, OrderStatus } from "@/types/OrderTypes";

import OrderDetailsHeader from "@/components/admin/orders/details/OrderDetailsheader";
import OrderSummary from "@/components/admin/orders/details/OrderSummary";
import OrderCustomerInfo from "@/components/admin/orders/details/OrderCustomerInfo";
import OrderShippingAddress from "@/components/admin/orders/details/OrderShippingAddress";
import OrderProducts from "@/components/admin/orders/details/OrderProducts";
import OrderDates from "@/components/admin/orders/details/OrderDates";

import OrdersLoading from "@/components/admin/orders/list/OrdersLoading";
import OrdersAccessDenied from "@/components/admin/orders/list/OrdersAccessDenied";
import OrdersError from "@/components/admin/orders/list/OrdersError";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function AdminOrderDetailsPage() {
    const params = useParams();
    const orderId = params.id as string;

    const {
        token,
        loading: authLoading,
        isAdmin,
    } = useAuth();

    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [updating, setUpdating] = useState(false);

    const fetchOrder = useCallback(async () => {
        if (!token || !orderId) {
            return;
        }

        try {
            setLoading(true);
            setError("");

            /* Currently we have: . GET /orders/admin .We do not have: . GET/orders/admin/:id
            So we fetch all admin orders and find the required order by ID.
            */

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
                    data.message ||
                    "Failed to fetch order"
                );
            }

            const foundOrder = data.orders.find(
                (item: Order) =>
                    item._id === orderId
            );

            if (!foundOrder) {
                setError("Order not found");
                setOrder(null);
                return;
            }
            setOrder(foundOrder);
        } catch (error) {
            console.error("Failed to fetch order:", error);

            setError(
                error instanceof Error
                    ? error.message
                    : "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    }, [token, orderId]);

    useEffect(() => {
        if (!authLoading && token && isAdmin) {
            fetchOrder();
        }
    }, [authLoading, token, isAdmin, fetchOrder]);

    const handleStatusChange = async (
        status: OrderStatus
    ) => {
        if (!token || !order) {
            return;
        }

        try {
            setUpdating(true);

            const response = await authFetch(
                `${API}/orders/admin/${order._id}/status`,
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
                    data.message ||
                    "Failed to update status"
                );
            }
            setOrder(data.order);
        } catch (error) {
            console.error("Failed to update status:", error);

            alert(
                error instanceof Error
                    ? error.message
                    : "Failed to update status"
            );
        } finally {
            setUpdating(false);
        }
    };

    if (authLoading || loading) {
        return <OrdersLoading />;
    }

    if (!isAdmin) {
        return <OrdersAccessDenied />
    }

    if (error) {
        return (
            <OrdersError
                message={error}
                onRetry={fetchOrder}
            />
        );
    }

    if (!order) {
        return null;
    }

    return (
        <main className="p-6">
            <OrderDetailsHeader
                order={order}
                updating={updating}
                onStatusChange={handleStatusChange}
            />

            <OrderSummary order={order} />

            <div className="mb-6 grid gap-6 lg:grid-cols-2">
                <OrderCustomerInfo order={order} />
                <OrderShippingAddress order={order} />
            </div>

            <OrderProducts order={order} />
            <OrderDates order={order} />
        </main>
    );
}
