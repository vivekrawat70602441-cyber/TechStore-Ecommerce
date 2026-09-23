

export default function StatisticsLoading() {
    return (
        <div className="space-y-6">

            {/* Overview cards */}

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

                {Array.from({ length: 4 }).map((_, index) => (
                    <div
                        key={index}
                        className="h-32 animate-pulse rounded-2xl bg-gray-200 dark:bg-slate-800"
                    />
                ))}
            </div>

            {/* Charts / status */}

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="h-80 animate-pulse rounded-2xl bg-gray-200 dark:bg-slate-800" />
                <div className="h-80 animate-pulse rounded-2xl bg-gray-200 dark:bg-slate-800" />
            </div>
        </div>
    );
}