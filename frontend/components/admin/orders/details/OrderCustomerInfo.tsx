import type { Order } from "@/types/OrderTypes";

interface OrderCustomerInfoProps {
    order: Order;
}

export default function OrderCustomerInfo({
    order,
}: OrderCustomerInfoProps) {
    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Customer Information
            </h2>

            <div className="mt-5 space-y-3">
                <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Name
                    </p>

                    <p className="font-medium text-gray-900 dark:text-white">
                        {order.user?.name ||
                            order.shippingAddress.fullName}
                    </p>
                </div>

                <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Email
                    </p>

                    <p className="font-medium text-gray-900 dark:text-white">
                        {order.user?.email ||
                            order.shippingAddress.email}
                    </p>
                </div>
            </div>
        </div>
    );
}