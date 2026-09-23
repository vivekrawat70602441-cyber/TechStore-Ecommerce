import ProductGridSkeleton from "./ProductGridSkeleton";

export default function ProductDetailsSkeleton() {
    return (
        <div className="animate-pulse">

            {/* Breadcrumb */}

            <div className="mb-8 h-5 w-64 rounded bg-gray-200" />

            {/* Product Section */}

            <div className="grid gap-10 py-10 lg:grid-cols-2">

               {/* Left - Product Image */}

              <div>

                <div className="h-125 rounded-2xl bg-gray-200" />

                <div className="mt-4 flex gap-3">

                     {Array.from({ length: 4 }).map((_, index) => (

                        <div 
                           key={index}
                           className="h-20 w-20 rounded-xl bg-gray-200" 
                        />

                     ))}

                </div>

              </div>

              {/* Right */}

            <div>

                {/* Title */}

                <div className="h-10 w-3/4 rounded bg-gray-200" />

                {/* Brand */}

                <div className="mt-5 h-5 w-40 rounded bg-gray-200" />

                {/* Price */}

                <div className="mt-6 h-10 w-36 rounded bg-gray-200" />

                {/* Description */}

                <div className="mt-8 space-y-3">
                     
                    <div className="h-4 rounded bg-gray-200" />

                    <div className="h-4 rounded bg-gray-200" />

                    <div className="h-4 rounded bg-gray-200" />

                </div>

                {/* Buttons */}

                <div className="mt-10 flex gap-4">

                    <div className="h-12 flex-1 rounded-xl bg-gray-200" />

                    <div className="h-12 w-12 rounded-xl bg-gray-200" />

                </div>

            </div>

            </div>

            {/* Tabs */}
            <div className="mt-12">

                <div className="mb-6 h-8 w-40 rounded bg-gray-200" />

                <div className="space-y-3">

                    <div className="h-4 rounded bg-gray-200" />

                    <div className="h-4 rounded bg-gray-200" />

                    <div className="h-4 w-4/5 rounded bg-gray-200" />

                </div>

            </div>

            {/* Related Products */}

            <div className="mt-20">

                 <div className="mb-8 h-8 w-52 rounded bg-gray-200" />

                 <ProductGridSkeleton />

            </div>
            
        </div>
    );
}