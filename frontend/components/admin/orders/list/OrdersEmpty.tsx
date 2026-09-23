export default function OrdersEmpty() {
    return (
        <div className="rounded-2xl border border-gray-200 bg-white py-12 text-center shadow-sm dark:bg-slate-900">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                No Orders Found
            </h2>

            <p className="mt-2 text-gray-500 dark:text-gray-400">
                There are currently no customer orders.
            </p>
        </div>
    );
}