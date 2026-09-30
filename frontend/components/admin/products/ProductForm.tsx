"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authFetch } from "@/lib/authFetch";

import ProductBasicInfo from "./ProductBasicInfo";
import ProductPricing from "./ProductPricing";
import ProductImages from "./ProductImages";
import ProductStatus from "./ProductStatus";

const API = process.env.NEXT_PUBLIC_API_URL;

export interface ProductFormData {
    name: string;
    slug: string;
    brand: string;
    category: string;
    sku: string;
    stock: number;
    description: string;
    image: string;
    images: string;
    price: number;
    originalPrice: number;
    discount: number;
    isBestSeller: boolean;
    isSale: boolean;
    NewArrival: boolean;
}

export default function ProductForm() {

    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState<ProductFormData>({
        name: "",
        slug: "",
        brand: "",
        category: "",
        sku: "",
        stock: 0,
        description: "",
        image: "",
        images: "",
        price: 0,
        originalPrice: 0,
        discount: 0,
        isBestSeller: false,
        isSale: false,
        NewArrival: false,
    });

    // Handle normal inputs

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement |
            HTMLTextAreaElement |
            HTMLSelectElement
        >
    ) => {

        const { name, value, type } = e.target;

        setFormData((previous) => ({
            ...previous,

            [name]:
                type === "number"
                    ? Number(value)
                    : value,
        }));
    };

    // Handle checkboxes

    const handleCheckboxChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {

        const { name, checked } = e.target;

        setFormData((previous) => ({
            ...previous,
            [name]: checked,
        }));
    };

    // SUbmit product

    const handleSubmit = async (
        e: React.SubmitEvent<HTMLFormElement>
    ) => {

        e.preventDefault();
        setSubmitting(true);

        try {

            // Convert comma-separated
            // images into array

            const images = formData.images
                .split(",")
                .map(
                    (image) => image.trim()
                )
                .filter(Boolean);

            const productData = { ...formData, images, };

            // Remove temporary
            // string version

            const response = await authFetch(`${API}/products`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json",

                    },

                    body: JSON.stringify(productData),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(
                    data.message ||
                    "Failed to create product"
                );
                return;
            }

            alert("Product created successfully");
            router.push("/admin/products");
        } catch (error) {
            console.error("Create product error:", error);
            alert("Something went wrong");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full min-w-0 space-y-6 sm:space-y-8"
        >
            {/* Basic Information */}

            <ProductBasicInfo
                formData={formData}
                handleChange={handleChange}
            />

            {/* Pricing */}

            <ProductPricing
                formData={formData}
                handleChange={handleChange}
            />

            {/* Description */}

            <section className="w-full min-w-0 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6 dark:border-slate-700 dark:bg-slate-900">

                <h2 className="mb-5 text-lg font-semibold text-gray-900 sm:mb sm:text-xl dark:text-white">
                    Description
                </h2>

                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={6}
                    placeholder="Describe the product..."
                    className="w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-blue-600 sm:text-base dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />

            </section>

            {/* Images */}

            <ProductImages
                formData={formData}
                handleChange={handleChange}
            />

            {/* Status */}

            <ProductStatus
                formData={formData}
                handleCheckboxChange={handleCheckboxChange}
            />

            {/* Buttons */}

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end sm:gap-4">

                <button
                    type="button"
                    onClick={() => router.push("/admin/products")}
                    className="w-full rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-100 sm:w-auto dark:border-slate-700 dark:text-gray-300 dark:hover:bg-slate-800"
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    disabled={submitting}
                    className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
                >
                    {submitting
                        ? "Creating..."
                        : "Create Product"}
                </button>

            </div>
        </form>
    );
}
