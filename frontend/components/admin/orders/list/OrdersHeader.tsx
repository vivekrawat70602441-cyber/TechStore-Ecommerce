"use client";

interface OrdersHeaderProps {
    onRefresh: () => void;
}

export default function OrdersHeader({
    onRefresh,
}: OrdersHeaderProps) {
    return (
        <div className="mb-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Orders
                    </h1>

                    <p className="mt-1 text-gray-500 dark:text-gray-400">
                        Manage customer orders and update their status.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={onRefresh}
                    className="rounded-lg border-gray-300 bg-white px-4 py-2 text-gray-700 transition hover:bg-gray-50 dark:border-slate-700 dark:bg-slate-900 dark:text-gray-200 dark:hover:bg-slate-800"
                >
                    Refresh
                </button>
            </div>
        </div>
    );
}