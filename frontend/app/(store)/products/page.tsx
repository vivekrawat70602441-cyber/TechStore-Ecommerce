"use client";

import { useState } from "react";

import ProductHeader from "@/components/products/ProductHeader";
import ProductToolbar from "@/components/products/ProductToolbar";
import ProductGrid from "@/components/products/ProductGrid";

export default function ProductPage() {

    const [searchTerm, setSearchTerm] = useState("");

    const [sortOption, setSortOption] = useState("featured");

    return (
        <>
            <main className="pt-20">
                <ProductHeader />

                <ProductToolbar
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    sortOption={sortOption}
                    setSortOption={setSortOption}
                />

                <ProductGrid
                    searchTerm={searchTerm}
                    sortOption={sortOption}
                />

            </main>
        </>
    );
}