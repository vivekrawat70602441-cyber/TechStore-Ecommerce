"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface Props {
    notFound?: boolean;
    error?: string;
}

export default function ProductEditHeader({
    notFound = false,
    error,
}: Props) {
    if (notFound) {
        return (
            <div className="space-y-6">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Product Not Found
                </h1>

                <Link
                   href="/admin/products"
                   className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
                >
                    <ArrowLeft size={18} />
                    Back to Products
                </Link>

                {error && (
                    <p className="text-red-600 dark:text-red-400">
                        {error}
                    </p>
                )}
            </div>
        );
    }

    return (
        <div className="flex items-center gap-4">
            <Link
               href="/admin/products"
            >
                <ArrowLeft size={22} />
            </Link>

            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Edit Product
                </h1>

                <p className="mt-1 text-gray-600 dark:text-gray-400">
                    Update product information
                </p>
            </div>
        </div>
    );
}