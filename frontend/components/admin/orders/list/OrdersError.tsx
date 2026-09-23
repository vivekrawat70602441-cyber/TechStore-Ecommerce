"use client";

interface OrdersErrorProps {
    message: string;
    onRetry: () => void;
}

export default function OrdersError({
    message,
    onRetry,
}: OrdersErrorProps) {
    return (
        <div className="p-6">
            <div className="rounded-xl border border-red-200 bg-red-200 p-6 dark:border-red-900 dark:bg-red-950/30">
                <h2 className="font-semibold text-red-700 dark:text-red-400">
                    Failed to Load orders
                </h2>

                <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                    {message}
                </p>

                <button
                    type="button"
                    onClick={onRetry}
                    className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
                >
                    Try Again
                </button>
            </div>
        </div>
    );
}