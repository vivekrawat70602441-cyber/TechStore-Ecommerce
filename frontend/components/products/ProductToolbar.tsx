"use client";
import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import Container from "../common/Container";
import { useEffect, useState } from "react";
import type { Product } from "@/types/product";

interface ProductToolbarProps {
    searchTerm: string;
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;

    sortOption: string;
    setSortOption: React.Dispatch<React.SetStateAction<string>>;
}

export default function ProductToolbar({
    searchTerm,
    setSearchTerm,
    sortOption,
    setSortOption,
}: ProductToolbarProps) {

    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/products`
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch products");
                }

                const data: Product[] = await response.json();

                setProducts(data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchProducts();
    }, []);


    // Search Suggestions
    const suggestions =
        searchTerm.trim() === ""
            ? []
            : products
                .filter(
                    (product) =>
                        product.name
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase()) ||
                        product.brand
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase())
                )
                .slice(0, 5);
    return (

        <section className="pb-10">
            <Container>

                <div className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between dark:border-slate-700 dark:bg-slate-900">

                    {/* Search */}

                    <div className="relative md:w-96">

                        <div className="flex items-center gap-3 rounded-xl border border-gray-300 bg-white px-4 py-3 md:w-96 dark:border-slate-700 dark:bg-slate-900">

                            <Search
                                size={20}
                                className="text-gray-500 dark:text-gray-400"
                            />

                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-transparent text-gray-900 placeholder:text-gray-500 outline-none dark:text-white dark:placeholder:text-gray-400"
                            />

                        </div>

                        {/* Suggestions */}

                        {suggestions.length > 0 && (

                            <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-900">

                                {suggestions.map((product) => (

                                    <Link
                                        key={product._id}
                                        href={`/products/${product.slug}`}
                                        onClick={() => setSearchTerm("")}
                                        className="flex items-center gap-4 border-b border-gray-200 p-3 transition-all duration-200 hover:bg-blue-50 hover:pl-5 last:border-b-0 dark:border-slate-700 dark:hover:bg-slate-800"
                                    >

                                        <div className="h-14 w-14 overflow-hidden rounded-lg border bg-white">

                                            <Image
                                                src={product.image}
                                                alt={product.name}
                                                width={56}
                                                height={56}
                                                className="h-full w-full object-cover"
                                            />

                                        </div>

                                        <div className="flex-1">

                                            <h4 className="font-medium">
                                                {product.name}
                                            </h4>

                                            <p className="text-sm text-gray-500">
                                                {product.brand}
                                            </p>

                                            <p className="text-sm font-semibold text-blue-600">
                                                ₹{product.price.toLocaleString("en-IN")}
                                            </p>

                                        </div>
                                    </Link>

                                ))}

                            </div>

                        )}
                    </div>

                    {/* Sort */}
                    <select
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                        className="w-full md:w-64 rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white">

                        <option value="featured" className="text-black dark:text-white">
                            Featured
                        </option>

                        <option value="low" className="text-black dark:text-white">
                            Price: Low to High
                        </option>

                        <option value="high" className="text-black dark:text-white">
                            Price: High to Low
                        </option>


                        <option value="rating" className="text-black dark:text-white">
                            Highest Rating
                        </option>

                    </select>

                </div>

            </Container>
        </section>
    );
}