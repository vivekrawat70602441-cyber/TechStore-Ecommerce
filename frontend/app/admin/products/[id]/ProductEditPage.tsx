"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import type { Product } from "@/types/product";
import { useAuth } from "@/context/AuthContext";
import { authFetch } from "@/lib/authFetch";

import ProductEditHeader from "./ProductEditHeader";
import ProductEditMessages from "./ProductEditMessages";
import ProductEditForm from "./ProductEditForm";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function ProductEditPage() {
    const { id } = useParams<{ id: string }>();
    const { token } = useAuth();

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        if (!token || !id) return;

        async function fetchProduct() {
            try {
                setLoading(true);
                setError("");

                const response = await authFetch(`${API}/products/admin`, {
                    headers: {
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch products");
                }

                const products: Product[] = await response.json();

                const foundProduct = products.find(
                    (item) => item._id === id
                );

                if (!foundProduct) {
                    setError("Product not found");
                    return;
                }

                setProduct(foundProduct);
            } catch (error) {
                console.error("Product fetch error:", error);
                setError("Failed to load product");
            } finally {
                setLoading(false);
            }
        }
        fetchProduct();
    }, [token, id]);

    const handleChange = (
        field: keyof Product,
        value: Product[keyof Product]
    ) => {
        setProduct((prev) => {
            if (!prev) return prev;

            return {
                ...prev,
                [field]: value,
            };
        });
    };

    const handleSubmit = async (
        event: React.SubmitEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        if (!product || !token) return;

        try {
            setSaving(true);
            setError("");
            setSuccess("");

            const response = await authFetch(
                `${API}/products/${product._id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: product.name,
                        slug: product.slug,
                        brand: product.brand,
                        category: product.category,
                        sku: product.sku,
                        stock: product.stock,
                        description: product.description,
                        image: product.image,
                        images: product.images,
                        price: product.price,
                        originalPrice: product.originalPrice,
                        rating: product.rating,
                        reviews: product.reviews,
                        discount: product.discount,
                        isBestSeller: product.isBestSeller,
                        isSale: product.isSale,
                        NewArrival: product.NewArrival,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to update product"
                );
            }

            setProduct(data.product);
            setSuccess("Product updated successfully.");
        } catch (error) {
            console.error("Update product error:", error);

            setError(
                error instanceof Error
                    ? error.message
                    : "Failed to update product"
            );
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-100 items-center justify-center">
                <p className="text-gray-600 dark:text-gray-300">
                    Loading product...
                </p>
            </div>
        );
    }

    if (!product) {
        return (
            <ProductEditHeader
                notFound
                error={error}
            />
        );
    }

    return (
        <main className="space-y-8">
            <ProductEditHeader />

            <ProductEditMessages
                error={error}
                success={success}
            />

            <ProductEditForm
                product={product}
                saving={saving}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
        </main>
    );
}
