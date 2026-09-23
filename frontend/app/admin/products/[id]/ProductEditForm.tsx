"use client";

import type { SubmitEvent } from "react";
import type { Product } from "@/types/product";

import ProductEditBasicInfo from "./ProductEditBasicInfo";
import ProductEditPricing from "./ProductEditPricing";
import ProductEditImages from "./ProductEditImages";
import ProductEditDescription from "./ProductEditDescription";
import ProductEditStatus from "./ProductEditStatus";
import ProductEditActions from "./ProductEditActions";

interface ProductEditFormProps {
    product: Product;
    saving: boolean;
    handleChange: (
        field: keyof Product,
        value: Product[keyof Product]
    ) => void;
    handleSubmit: (
        event: SubmitEvent<HTMLFormElement>
    ) => void | Promise<void>;
}

export default function ProductEditForm({
    product,
    saving,
    handleChange,
    handleSubmit,
}: ProductEditFormProps) {
    return (
        <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-gray-200 bg-white p-8 dark:border-slate-700 dark:bg-slate-900"
        >
            <div className="grid gap-6 md:grid-cols-2">

                <ProductEditBasicInfo
                    product={product}
                    handleChange={handleChange}
                />

                <ProductEditPricing
                    product={product}
                    handleChange={handleChange}
                />

                <ProductEditImages
                    product={product}
                    handleChange={handleChange}
                />

                <ProductEditDescription
                    product={product}
                    handleChange={handleChange}
                />

                <ProductEditStatus
                    product={product}
                    handleChange={handleChange}
                />

            </div>

            <ProductEditActions
                saving={saving}
            />
        </form>
    );
}