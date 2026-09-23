" use client";
import Link from "next/link";
import type { Order } from "@/types/OrderTypes";
import OrderStatusSelect from "../shared/OrderStatusSelect";

interface OrderTableRowProps {
    order: Order;
    updatingOrderId: string | null;
    onStatusChange: (
        orderId: string,
        status: Order["status"]
    ) => void;
}

export default function OrderTableRow({
    order,
    updatingOrderId,
    onStatusChange,
}: OrderTableRowProps) {

    const isUpdating = updatingOrderId === order._id;

    return (
        <tr className="transition hover:bg-gray-50 dark:hover:bg-slate-800/40">
            <td className="px-6 py-5">
                <Link
                    href={`/admin/orders/${order._id}`}
                    className="font-semibold text-blue-600 hover:underline"
                >
                    #{order._id.slice(-8)}
                </Link>
            </td>

            <td className="px-6 py-5">
                <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                        {order.user?.name ||
                            order.shippingAddress.fullName}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {order.user?.email ||
                            order.shippingAddress.email}
                    </p>
                </div>
            </td>

            <td className="px-6 py-5">
                <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 dark:bg-slate-800 dark:text-gray-300">
                    {order.products.length}{" "}
                    {order.products.length === 1
                        ? "item"
                        : "items"}
                </span>
            </td>

            <td className="px-6 py-5">
                <span className="font-semibold text-gray-900 dark:text-white">
                    ₹{order.totalPrice.toLocaleString("en-IN")}
                </span>
            </td>

            <td className="px-6 py-5">
                <OrderStatusSelect
                    status={order.status}
                    disabled={isUpdating}
                    onChange={(status) =>
                        onStatusChange(order._id, status)
                    }
                />
            </td>

            <td className="px-6 py-5 text-sm text-gray-500 dark:text-gray-400">
                {new Date(
                    order.createdAt
                ).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                })}
            </td>

            <td className="px-6 py-5">
                <Link
                    href={`/admin/orders/${order._id}`}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                    View
                </Link>
            </td>
        </tr>
    );
}