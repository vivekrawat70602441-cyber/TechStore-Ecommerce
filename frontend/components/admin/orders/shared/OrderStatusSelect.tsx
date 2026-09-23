"use client";

import type { Order, OrderStatus } from "@/types/OrderTypes";

interface OrderStatusSelectProps {
    status: Order["status"];
    disabled?: boolean;
    onChange: (status: OrderStatus) => void;
}

const statuses: OrderStatus[] = [
    "Pending",
    "Confirmed",
    "Shipped",
    "Delivered",
    "Cancelled",
];

export default function OrderStatusSelect({
    status,
    disabled = false,
    onChange,
}: OrderStatusSelectProps) {
    return (
        <select
            value={status}
            disabled={disabled}
            onChange={(e) =>
                onChange(e.target.value as OrderStatus)
            }
            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 outline-none focus:border-blue-600 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:bg-slate-800 dark:text-gray-200"
        >
            {statuses.map((statusOption) => (
                <option
                    key={statusOption}
                    value={statusOption}
                >
                    {statusOption}
                </option>
            ))}
        </select>
    );
}