import type { Order } from "@/types/OrderTypes";

interface OrderSummaryProps {
    order: Order;
}

export default function OrderSummary({
    order,
}: OrderSummaryProps) {
    return (
        <div className="mb-6 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Order Status
                </p>

                <p className="mt-2 text-xl font-bold text-gray-900 dark:text-white">
                    {order.status}
                </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Total Amount
                </p>

                <p className="mt-2 text-xl font-bold text-gray-900 dark:text-white">
                    ₹{order.totalPrice.toLocaleString("en-IN")}
                </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Items
                </p>

                <p className="mt-2 text-xl font-bold text-gray-900 dark:text-white">
                    {order.products.length}
                </p>
            </div>
        </div>
    );
}