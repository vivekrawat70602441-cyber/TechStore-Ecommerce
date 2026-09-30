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
            <div className="space-y-5 sm:space-y-6">
              <div className="min-w-0">
                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">
                    Product Not Found
                </h1>

                {error && (
                   <p className="mt-2 wrap-break-word text-sm leading-6 text-red-600 sm:text-base dark:text-red-400">
                      {error}
                   </p>
                )}
              </div>

                <Link
                   href="/admin/products"
                   className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700 sm:w-auto sm:text-base"
                >
                    <ArrowLeft size={18} />
                    Back to Products
                </Link>
            </div>
        );
    }

    return (
        <div className="flex min-w-0 items-start gap-3 sm:items-center sm:gap-4">
            <Link
               href="/admin/products"
               aria-label="Back to Products"
               className="mt-1 flex shrink-0 items-center justify-center rounded-lg p-2 text-gray-700 transition hover:bg-gray-100 hover:text-gray-900 sm:mt-0 dark:text-gray-300 dark:hover:bg-slate-800 dark:hover:text-white"
            >
                <ArrowLeft size={22} />
            </Link>

            <div className="min-w-0">
                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">
                    Edit Product
                </h1>

                <p className="mt-1 wrap-break-word text-sm text-gray-600 sm:text-base dark:text-gray-400">
                    Update product information
                </p>
            </div>
        </div>
    );
}