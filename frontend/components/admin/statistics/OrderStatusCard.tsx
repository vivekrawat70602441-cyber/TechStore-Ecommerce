"use client";

import type { OrdersByStatus } from "@/types/statistics";

interface OrderStatusCardProps {
    ordersByStatus: OrdersByStatus;
}

export default function OrderStatusCard({
    ordersByStatus,
}: OrderStatusCardProps) {

    const statuses = [
        {
            name: "Pending",
            value: ordersByStatus.Pending,
        },
        {
            name: "Confirmed",
            value: ordersByStatus.Confirmed,
        },
        {
            name: "Shipped",
            value: ordersByStatus.Shipped,
        },
        {
            name: "Delivered",
            value: ordersByStatus.Delivered,
        },
        {
            name: "Cancelled",
            value: ordersByStatus.Cancelled,
        },
    ];

    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <h2 className="mb-6 text-xl font-semibold text-gray-900 dark:text-white">
                Order Status
            </h2>

            <div className="space-y-4">
                {statuses.map((status) => (
                    <div
                        key={status.name}
                        className="flex items-center justify-between"
                    >

                        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                            {status.name}
                        </span>
                        <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-900 dark:bg-slate-800 dark:text-white">
                            {status.value}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}