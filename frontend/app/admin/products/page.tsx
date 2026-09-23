"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";

import type { Product } from "@/types/product";
import { useAuth } from "@/context/AuthContext";
import { authFetch } from "@/lib/authFetch";

export default function AdminProductsPage() {
    const { token } = useAuth();

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchProducts = useCallback(async () => {
        try {
            setLoading(true);
            setError("");

            const response = await authFetch(
                `${process.env.NEXT_PUBLIC_API_URL}/products/admin`,
                {
                    headers: {
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Failed to fetch products");
            }

            const data = await response.json();
            setProducts(data);

        } catch (error) {
            console.error("Admin products error:", error);

            setError("Failed to load products");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (token) {
            fetchProducts();
        }
    }, [token, fetchProducts]);

    const handleDelete = async (id: string) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmed) {
            return;
        }

        try {
            const response = await authFetch(
                `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`,
                {
                    method: "DELETE",
                    headers: {
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Failed to delete product");
            }

            setProducts((prevProducts) =>
                prevProducts.filter((product) => product._id !== id)
            );
        } catch (error) {
            console.error("Delete product error:", error);
            alert("Failed to delete product");
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-100 items-center justify-center">
                <p className="text-gray-600 dark:text-gray-300">
                    Loading products...
                </p>
            </div>
        );
    }

    return (
        <main className="space-y-8">

            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Products
                    </h1>

                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        Manage your store products
                    </p>
                </div>

                <Link
                    href="/admin/products/new"
                    className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
                >
                    <Plus size={18} />
                    Add Product
                </Link>
            </div>

            {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-600 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400">
                    {error}
                </div>
            )}

            {products.length === 0 ? (
                <div className="flex min-h-75 items-center justify-center rounded-2xl border border-gray-200 bg-white dark:border-slate-700 dark:bg-slate-900">
                    <p className="text-gray-500 dark:text-gray-400">
                        No products found.
                    </p>
                </div>
            ) : (
                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-slate-700 dark:bg-slate-900">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="border-b border-gray-200 bg-gray-50 dark:border-slate-700 dark:bg-slate-800">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
                                        Product
                                    </th>

                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
                                        Category
                                    </th>

                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
                                        Price
                                    </th>

                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
                                        Stock
                                    </th>

                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {products.map((product) => (
                                    <tr
                                        key={product._id}
                                        className="border-b border-gray-100 last:border-b-0 dark:border-slate-800"
                                    >

                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-4">
                                                <Image
                                                    src={product.image}
                                                    alt={product.name}
                                                    width={56}
                                                    height={56}
                                                    className="h-14 w-14 rounded-lg object-contain bg-gray-100 dark:bg-slate-800"
                                                />

                                                <div>
                                                    <p className="font-semibold text-gray-900 dark:text-white">
                                                        {product.name}
                                                    </p>

                                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                                        {product.brand}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-6 py-5 text-sm text-gray-600 dark:text-gray-300">
                                            {product.category}
                                        </td>

                                        <td className="px-6 py-5 font-medium text-gray-900 dark:text-white">
                                            ₹
                                            {product.price.toLocaleString(
                                                "en-IN"
                                            )}
                                        </td>

                                        <td className="px-6 py-5">
                                            <span
                                                className={
                                                    product.stock > 0
                                                        ? "rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                                        : "rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700 dark:bg-red-900/30 dark:text-red-400"
                                                }
                                            >
                                                {product.stock}
                                            </span>
                                        </td>

                                        <td className="px-6 py-5">
                                            <div className="flex justify-end gap-2">
                                                <Link
                                                    href={`/admin/products/${product._id}`}
                                                    className="rounded-lg p-2 text-blue-600 transition hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-950/30"
                                                    title="Edit product"
                                                >
                                                    <Pencil size={18} />
                                                </Link>

                                                <button
                                                    onClick={() => handleDelete(product._id)}
                                                    className="rounded-lg p-2 text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30"
                                                    title="Delete product"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </main>
    );
}
