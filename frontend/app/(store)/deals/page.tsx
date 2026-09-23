"use client";
import Container from "@/components/common/Container";
import Breadcrumb from "@/components/common/Breadcrumb";
import ProductCard from "@/components/products/ProductCard";
import FadeUp from "@/components/animations/FadeUp";
import { useEffect, useState } from "react";
import type { Product } from "@/types/product";


export default function DealsPage() {

    const [dealsProducts, setDealsProducts] = useState<Product[]>([]);

    useEffect(() => {
        async function fetchDeals() {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/products`
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch products");
                }

                const data: Product[] = await response.json();

                const deals = data.filter(
                    (product) => product.isSale
                );

                setDealsProducts(deals);

            } catch (error) {
                console.error(error);
            }
        }

        fetchDeals();

    }, []);
    return (

        <main className="pt-20 pb-20">
            <Container>

                <Breadcrumb
                    items={[
                        {
                            label: "Home",
                            href: "/",
                        },
                        {
                            label: "Deals",
                        },
                    ]}
                />

                {/* Heading */}


                <div className="mb-12 text-center">

                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                        Today&apos;s Deals
                    </h1>

                    <p className="mt-4 text-gray-600 dark:text-gray-400">
                        Discover limited-time discounts on our best-selling
                        products.Shop now before the offers end!
                    </p>

                </div>

                {/* Hero Banner */}
                <FadeUp>

                    <div className="mb-14 rounded-3xl bg-linear-to-r from-blue-600 to-indigo-600 p-10 text-center text-white shadow-lg">

                        <h2 className="text-4xl font-bold">
                            🔥 Mega Sale
                        </h2>

                        <p className="mt-4">
                            Save up to <span className="font-bold">50% OFF</span>
                            {" "}on selected laptops, accessories, gaming gear, and much more.
                        </p>

                    </div>

                </FadeUp>

                {/* Products */}

                <div className="mb-8 flex items-center justify-between">

                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Featured Deals
                    </h2>

                    <span className="rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-600 dark:bg-red-900/30 dark:text:text-red-400">
                        {dealsProducts.length} Deals Available
                    </span>

                </div>

                {dealsProducts.length === 0 ? (

                    <FadeUp>

                        <div className="rounded-2xl border border-gray-200 py-16 text-center dark:border-slate-700 dark:bg-slate-900">

                            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                                No Deals Available
                            </h2>

                            <p className="mt-3 text-gray-600 dark:text-gray-400">
                                Please check back later for exciting offers.
                            </p>

                        </div>

                    </FadeUp>

                ) : (

                    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

                        {dealsProducts.map((product, index) => (

                            <FadeUp
                                key={product._id}
                                delay={index * 0.1}
                            >
                                <ProductCard product={product} />
                            </FadeUp>

                        ))}


                    </div>

                )}

            </Container>
        </main>
    );
}