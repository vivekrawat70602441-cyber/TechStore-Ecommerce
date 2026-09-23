import type { Order } from "@/types/OrderTypes";

interface OrderShippingAddressProps {
    order: Order;
}

export default function OrderShippingAddress({
    order,
}: OrderShippingAddressProps) {
    const { shippingAddress } = order;

    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Shipping Address
            </h2>

            <div className="mt-5 space-y-2 text-gray-700 dark:text-gray-300">
                <p className="font-semibold">
                    {shippingAddress.fullName}
                </p>

                <p>{shippingAddress.address}</p>

                <p>
                    {shippingAddress.city},{" "}
                    {shippingAddress.state}
                </p>

                <p>Pincode: {shippingAddress.pincode}</p>

                <p>Phone: {shippingAddress.email}</p>

                <p>Email: {shippingAddress.email}</p>
            </div>
        </div>
    );
}