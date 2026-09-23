"use client";

import type { Order } from "@/types/OrderTypes";
import OrderTableRow from "../list/OrderTableRow";

interface OrdersTableProps {
    orders: Order[];
    updatingOrderId: string | null;
    onStatusChange: (
        orderId: string,
        status: Order["status"]
    ) => void;
}

export default function OrdersTable({
    orders,
    updatingOrderId,
    onStatusChange,
}: OrdersTableProps) {
    return (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-slate-900 dark:bg-slate-900">
            <div className="overflow-x-auto">
                <table className="w-full min-w-225">
                    <thead className="border-b border-gray-200 bg-gray-50 dark:border-slate-800 dark:bg-slate-800/50">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                                Order
                            </th>

                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                                Customer
                            </th>

                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                                Products
                            </th>

                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                                Total
                            </th>

                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                                Status
                            </th>

                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                                Date
                            </th>

                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                                Action
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200 dark:divide-slate-800">
                        {orders.map((order) => (
                            <OrderTableRow
                                key={order._id}
                                order={order}
                                updatingOrderId={updatingOrderId}
                                onStatusChange={onStatusChange}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}