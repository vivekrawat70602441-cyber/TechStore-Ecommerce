import ProductCardSkeleton from "./ProductCardSkeleton";

export default function ProductGridSkeleton() {
    return (
        <div className="grid">

            {Array.from({ length: 6 }).map((_, index) => (

                <ProductCardSkeleton
                    key={index}
                />

            ))}

        </div>
    );
}