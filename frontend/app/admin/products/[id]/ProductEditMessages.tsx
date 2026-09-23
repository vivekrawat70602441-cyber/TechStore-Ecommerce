interface Props {
    error: string;
    success: string;
}

export default function ProductEditMessages({
    error,
    success,
}: Props) {
    return (
        <>
            {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-4 tet-red-600 dark:border-red-950/30 dark:text-red-400">
                    {error}
                </div>
            )}

            {success && (
                <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-green-600 dark:border-green-900 dark:bg-green-950/30 dark:text-green-400">
                    {success}
                </div>
            )}
        </>
    );
}