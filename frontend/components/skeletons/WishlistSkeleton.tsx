export default function WishlistSkeleton() {
    return (
        <div className="animate-pulse">

            {/* Page Title */}
            <div className="mb-10 h-10 w-56 rounded bg-gray-200" />

            {/* Wishlit Items */}
            <div className="space-y-6">

                {Array.from({ length: 3 }).map((_, index) => (

                    <div
                        key={index}
                        className="flex"
                    >

                        {/* Product Image */}
                        <div className="h-28 w-28 rounded-xl bg-gray-200" />

                        {/* Product Details */}
                        <div className="flex-1">

                            {/* Product Name */}
                            <div className="h-6 w-2/3 rounded bg-gray-200" />

                            {/* Brand */}
                            <div className="mt-3 h-4 w-32 rounded bg-gray-200" />

                            {/* Price */}
                            <div className="mt-5 h-7 w-24 rounded bg-gray-200" />

                        </div>

                        {/* Remove Button */}
                        <div className="h-10 w-24 rounded-lg bg-gray-200" />

                    </div>

                ))}

            </div>

        </div>

    );
}