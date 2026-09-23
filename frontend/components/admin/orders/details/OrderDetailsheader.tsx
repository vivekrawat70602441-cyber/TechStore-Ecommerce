"use client";

import Link from "next/link";

import type { Order, OrderStatus } from "@/types/OrderTypes";

import OrderStatusSelect from "../shared/OrderStatusSelect";

interface OrderDetailsHeaderProps {
    order: Order;
    updating: boolean;
    onStatusChange: (status: OrderStatus) => void;
}

export default function OrderDetailsHeader({
    order,
    updating,
    onStatusChange,
}: OrderDetailsHeaderProps) {
    return (
        <div className="mb-8">
            <Link
                href="/admin/orders"
                className="text-sm font-semibold text-blue-600 hover:underline"
            >
                ← Back to Orders
            </Link>

            <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Order Details
                    </h1>

                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Order ID: {order._id}
                    </p>
                </div>

                <div>
                    <OrderStatusSelect
                        status={order.status}
                        disabled={updating}
                        onChange={onStatusChange}
                    />
                </div>
            </div>
        </div>
    );
}