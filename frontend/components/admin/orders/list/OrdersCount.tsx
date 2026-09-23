interface OrdersCountProps {
    count: number;
}

export default function OrdersCount({
    count,
}: OrdersCountProps) {
    return (
        <div className="mb-6">
            <div className="inline-flex rounded-lg bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 dark:bg-blue-950/40 dark:text-blue-400">
                Total Orders: {count}
            </div>
        </div>
    )
}