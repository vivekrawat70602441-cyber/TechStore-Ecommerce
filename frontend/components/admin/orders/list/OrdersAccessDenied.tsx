"use client";

export default function OrdersAccessDenied() {
    return (
        <div className="flex min-h-[70vh] items-center justify-center">
            <div className="text-center">
                <h1 className="text-2xl font-bold text-red-600">
                    Access Denied
                </h1>

                <p className="mt-2 text-gray-600 dark:text-gray-400">
                    You do not have permission to view orders.
                </p>
            </div>
        </div>
    );
}