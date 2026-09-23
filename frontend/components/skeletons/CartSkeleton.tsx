export default function CartSkeleton() {
    return (
        <div className="animate-pulse">

            {/* Page Title */}
            <div className="mb-10 h-10 w-60 rounded bg-gray-200" />

            <div className="grid gap-10 lg:grid-cols-3">

                {/* Left Side - Cart Items */}
                <div className="space-y-6 lg:col-span-2">

                    {Array.from({ length: 2 }).map((_, index) => (

                        <div
                            key={index}
                            className="flex gap-6 rounded-2xl border bg-white-p-5"
                        >

                            {/* ProductImage */}
                            <div className="h-28 w-28 rounded-xl bg-gray-200" />

                            {/* Product Details */}
                            <div className="flex-1">

                                {/* Product Name */}
                                <div className="h-6 w-2/3 rounded bg-gray-200" />

                                {/* Brand */}
                                <div className="mt-3 h-4 w-32 rounded bg-gray-200" />

                                {/* Price */}
                                <div className="mt-5 h-7 w-24 rounded bg-gray-200" />

                                {/* Quantity + Remove */}
                                <div className="mt-6 flex items-center gap-4">

                                    <div className="h-10 w-28 rounded-lg bg-gray-200" />

                                    <div className="h-5 w-20 rounded bg-gray-200" />

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

                {/* Right Side - Order Summary */}
                <div className="h-fit rounded-2xl border bg-white p-6 shadow-sm">

                    <div className="mb-6 h-7 w-40 rounded bg-gray-200" />

                    <div className="mb-4 h-5 w-full rounded bg-gray-200" />

                    <div className="mb-6 h-6 w-full rounded bg-gray-200" />

                    <div className="h-12 rounded-xl bg-gray-200" />

                </div>

            </div>

        </div>
    );
}