import Image from "next/image";
import Link from "next/link";
import Container from "@/components/common/Container";
import FadeUp from "@/components/animations/FadeUp";
import type { Product } from "@/types/product";

export default async function CategoriesPage() {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/products`,
        {
            cache: "no-store",
        }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch products");
    }

    const products: Product[] = await response.json();
    const categories = [...new Set(products.map((product) => product.category))];


    return (
        <main className="pt-20 pb-20">
            <Container>

                <h1 className="mb-10 text-4xl font-bold text-gray-900 dark:text-white">
                    Shop by Categories
                </h1>

                <FadeUp>

                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

                        {categories.map((category) => {

                            const categoryProducts = products.filter(
                                (product) => product.category === category
                            );

                            const preview = categoryProducts[0];
                            if (!preview) return null;

                            return (

                                <Link
                                    key={category}
                                    href={`/products?category=${category}`}
                                    className="group overflow-hidden rounded-2xl border bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl dark:border-slate-700 dark:bg-slate-900 dark:hover:border-blue-500"
                                >

                                    <div className="relative h-56 overflow-hidden bg-white dark:bg-slate-800">

                                        <Image
                                            src={preview.image}
                                            alt={category}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                            className="object-contain transition duration-500 group-hover:scale-110"
                                        />

                                    </div>

                                    <div className="p-6 text-center">

                                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                                            {category}
                                        </h2>

                                        <p className="mt-2 text-gray-500 dark:text-gray-400">
                                            {categoryProducts.length}{" "}
                                            {categoryProducts.length === 1 ? "Product" : "Products"}
                                        </p>

                                    </div>

                                </Link>
                            );
                        })}
                    </div>

                </FadeUp>

            </Container>
        </main>
    );
}