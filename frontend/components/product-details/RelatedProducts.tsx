"use client";

import ProductCard from "@/components/products/ProductCard";
import FadeUp from "../animations/FadeUp";
import type { Product } from "@/types/product";
import { useState, useEffect } from "react";

interface RelatedProductsProps {
    product: Product;
}
export default function RelatedProducts({
    product,
}: RelatedProductsProps) {

    const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

    useEffect(() => {

        async function fetchRelatedProducts() {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/products`
                );

                const data: Product[] = await response.json();

                const filtered = data
                    .filter(
                        (item) =>
                            item.category === product.category &&
                            item._id !== product._id
                    )
                    .slice(0, 4);

                setRelatedProducts(filtered);
            } catch (error) {
                console.error(error);
            }

        }
        fetchRelatedProducts();
    }, [product.category, product._id]);

    if (relatedProducts.length === 0) {
        return null;
    }

    return (
        <section className="mt-20">

            <FadeUp>

                <h2 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">
                    Related Products
                </h2>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

                    {relatedProducts.map((item) => (
                        <ProductCard
                            key={item._id}
                            product={item}
                        />
                    ))}

                </div>

            </FadeUp>

        </section>
    );
}