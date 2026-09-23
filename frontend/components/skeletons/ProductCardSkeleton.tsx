export default function ProductCardSkeleton() {
    return (
        <div className="animate-pulse overflow-hidden rounded-2xl border bg-white p-4 shadow-sm">

            {/* Product Image */}
            <div className="h-56 w-full rounded-xl bg-gray-200" />

            {/*Product Name */}
            <div className="mt-5 h-6 w-3/4 rounded bg-gray-200" />

            {/* Brand */}
            <div className="mt-3 h-4 w-1/2 rounded bg-gray-200" />

            {/* Price */}
            <div className="mt-5 h-7 w-1/3 rounded bg-gray-200" />

            {/* Rating */}
            <div className="mt-4 flex gap-2">
                <div className="h-4 w-4 rounded-full bg-gray-200" />
                <div className="h-4 w-4 rounded-full bg-gray-200" />
                <div className="h-4 w-4 rounded-full bg-gray-200" />
                <div className="h-4 w-4 rounded-full bg-gray-200" />
                <div className="h-4 w-4 rounded-full bg-gray-200" />
            </div>

            {/* Buttons */}
            <div className="mt-6 flex gap-3">
                <div className="h-11 flex-1 rounded-xl bg-gray-200" />
                <div className="h-11 w-11 rounded-xl bg-gray-200" />
            </div>

        </div>
    );
}