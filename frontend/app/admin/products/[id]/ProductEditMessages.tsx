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
                <div className="mb-4 wrap-break-word rounded-xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-600 sm:text-base dark:border-red-900 dark:bg-red-950/30 dark:text-red-400">
                    {error}
                </div>
            )}

            {success && (
                <div className="mb-4 wrap-break-word rounded-xl border border-green-200 bg-green-50 p-4 text-sm leading-6 text-green-600 sm:text-base dark:border-green-900 dark:bg-green-950/30 dark:text-green-400">
                    {success}
                </div>
            )}
        </>
    );
}