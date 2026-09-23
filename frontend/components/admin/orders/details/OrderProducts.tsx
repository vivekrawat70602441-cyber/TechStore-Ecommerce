import type { Order } from "@/types/OrderTypes";

interface OrderProductsProps {
    order: Order;
}

export default function OrderProducts({
    order,
}: OrderProductsProps) {
    return (
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="border-b border-gray-200 p-6 dark:border-slate-800">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Ordered Products
                </h2>
            </div>

            <div className="divide-y divide-gray-200 dark:divide-slate-800">
                {order.products.map((item, index) => (
                    <div
                        key={`${item.product._id}-${index}`}
                        className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between"
                    >
                        <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                                {item.product.name}
                            </h3>

                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                Quantity: {item.quantity}
                            </p>
                        </div>

                        <div className="text-left sm:text-right">
                            <p className="font-semibold text-gray-900 dark:text-white">
                                ₹{item.price.toLocaleString("en-IN")}
                            </p>

                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                × {item.quantity}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}