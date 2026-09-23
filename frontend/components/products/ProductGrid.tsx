"use client";

import { useEffect, useState } from "react";
import { Filter, X } from "lucide-react";

import Container from "../common/Container";
import ProductCard from "./ProductCard";
import ProductFilters from "./ProductFilters";

import FadeUp from "../animations/FadeUp";
import type { Product } from "@/types/product";

interface ProductGridProps {
  searchTerm: string;
  sortOption: string;
}

export default function ProductGrid({
  searchTerm,
  sortOption,
}: ProductGridProps) {

  const [products, setProducts] = useState<Product[]>([]);

  // Selected Category
  const [selectedCategory, setSelectedCategory] = useState("");

  //Selected Brand
  const [selectedBrand, setSelectedBrand] = useState("");

  // Price Filter
  const [maxPrice, setMaxPrice] = useState(200000);

  // LoadMore
  const [visibleProducts, setVisibleProducts] = useState(6);

  //Mobile Filter Drawer
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {

    async function fetchProducts() {

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/products`
        );

        const data = await response.json();

        console.log("Fetched Products:", data);

        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchProducts();
  }, []);

  // Reset Load More when filters/search/sort change
  useEffect(() => {
    setVisibleProducts(6);
  }, [
    searchTerm,
    selectedCategory,
    selectedBrand,
    maxPrice,
    sortOption,
  ]);

  // Filter Products
  const filteredProducts = products.filter((product) => {

    const categoryMatch =
      selectedCategory === "" ||
      product.category === selectedCategory;

    const brandMatch =
      selectedBrand === "" ||
      product.brand === selectedBrand;

    const searchMatch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());

    const priceMatch = product.price <= maxPrice;

    return (
      categoryMatch &&
      brandMatch &&
      searchMatch &&
      priceMatch
    );
  });

  // Sorting
  const sortedProducts = [...filteredProducts];

  if (sortOption === "low") {
    sortedProducts.sort((a, b) => a.price - b.price);
  }

  if (sortOption === "high") {
    sortedProducts.sort((a, b) => b.price - a.price);
  }

  if (sortOption === "rating") {
    sortedProducts.sort((a, b) => b.rating - a.rating)
  }

  return (
    <section className="pb-20">

      <Container>

        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">

          {/* Desktop Sidebar */}

          <div className="hidden lg:block">

            <ProductFilters
              products={products}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedBrand={selectedBrand}
              setSelectedBrand={setSelectedBrand}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
            />

          </div>

          {/* Mobile Filter Drawer */}

          {showFilters && (

            <div className="fixed inset-0 z-50 bg-black/40 lg:hidden">

              <div className="absolute left-0 top-0 h-full w-80 overflow-y-auto border-r border-gray-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">

                <div className="mb-6 flex item-center justify-between">

                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Filters
                  </h2>

                  <button
                    onClick={() => setShowFilters(false)}
                    className="text-gray-700 dark:text-gray-200"
                  >
                    <X size={24} />
                  </button>

                </div>

                <ProductFilters
                  products={products}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  selectedBrand={selectedBrand}
                  setSelectedBrand={setSelectedBrand}
                  maxPrice={maxPrice}
                  setMaxPrice={setMaxPrice}
                />
              </div>

            </div>
          )}

          {/* Products */}
          <div>

            {/* Mobile Filter Button */}

            <div className="mb-6 lg:hidden">

              <button
                onClick={() => setShowFilters(true)}
                className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white"
              >
                <Filter size={18} />
                Filters
              </button>

            </div>

            <p className="mb-6 text-gray-700 dark:text-gray-300">

              Showing {" "}

              <span className="font-semibold">
                {Math.min(visibleProducts, sortedProducts.length)}
              </span>
              {" "}of{" "}

              <span className="font-semibold">
                {sortedProducts.length}
              </span>

              {" "}product

              {sortedProducts.length !== 1 && "s"}

            </p>

            {sortedProducts.length === 0 ? (

              <div className="flex h-96 items-center justify-center rounded-2xl border border-gray-200 dark:border-slate-700">

                <h2 className="text-2xl font-semibold text-gray-500">
                  No Products Found
                </h2>

              </div>

            ) : (

              <>
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">

                  {sortedProducts
                    .slice(0, visibleProducts)
                    .map((product, index) => (

                      <FadeUp
                        key={product._id}
                        delay={index * 0.08}
                      >
                        <ProductCard product={product} />
                      </FadeUp>

                    ))}

                </div>

                {/*Load More */}

                {visibleProducts < sortedProducts.length && (

                  <div className="mt-10 flex justify-center">

                    <button
                      onClick={() =>
                        setVisibleProducts((prev) => prev + 6)
                      }
                      className="rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700"
                    >
                      Load More
                    </button>

                  </div>
                )}
              </>
            )}

          </div>

        </div>

      </Container>

    </section>
  );
}      