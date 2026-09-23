"use client";

import { UserOrder } from "@/types/user";

interface UserOrdersProps {
    orders: UserOrder[];
}

export default function UserOrders({
    orders,
}: UserOrdersProps) {

    return (
        <section>
            <div className="mb-5">

                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Order History
                </h2>

                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Total Orders: {orders.length}
                </p>
            </div>

            {orders.length === 0 ? (
                <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center dark:border-slate-800 dark:bg-slate-900">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                        No Orders
                    </h3>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        This user not placed any orders yet.
                    </p>
                </div>
            ) : (
                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-175">
                            <thead className="border-b border-gray-200 bg-gray-50 dark:border-slate-800 dark:bg-slate-800/50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">
                                        Order ID
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">
                                        Items
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">
                                        Total
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">
                                        Status
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">
                                        Date
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-200 dark:divide-slate-800">
                                {orders.map((order) => (
                                    <tr key={order._id}>

                                        <td className="px-6 py-5">
                                            <code className="text-xs">
                                                {order._id.slice(-8)}
                                            </code>
                                        </td>
                                        <td className="px-6 py-5">
                                            {order.products.length}
                                        </td>
                                        <td className="px-6 py-5 font-medium">
                                            ₹{order.totalPrice.toLocaleString("en-IN")}
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5 text-sm text-gray-500">
                                            {new Date(
                                                order.createdAt
                                            ).toLocaleDateString("en-IN")}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </section>
    );
}