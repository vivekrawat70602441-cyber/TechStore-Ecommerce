import type { Order } from "@/types/OrderTypes";

interface OrderDatesProps {
    order: Order;
}

export default function OrderDates({
    order,
}: OrderDatesProps) {
    return (
        <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
            <p>
                Created:{" "}
                {new Date(order.createdAt).toLocaleString(
                    "en-IN"
                )}
            </p>

            <p className="mt-1">
                Last Updated:{" "}
                {new Date(order.updatedAt).toLocaleString(
                    "en-IN"
                )}
            </p>
        </div>
    );
}