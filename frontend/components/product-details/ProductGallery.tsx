"use client";

import { useState } from "react";
import Image from "next/image";
import { Product } from "@/types/product";
import { AnimatePresence, motion } from "motion/react";

interface ProductGalleryProps {
    product: Product;
}

export default function ProductGallery({
    product,
}: ProductGalleryProps) {

    const [selectedImage, setSelectedImage] = useState(
        product.images[0]
    );

    return (
        <div className="flex flex-col-reverse gap-4 lg:flex-row">

            {/* Thumbnails */}

            <div className="flex gap-3 lg:flex-col">

                {product.images.map((image, index) => (

                    <button
                        key={index}
                        aria-label={`View image ${index + 1}`}
                        onClick={() => setSelectedImage(image)}
                        className={`cursor-pointer overflow-hidden rounded-xl border-2 transition-all duration-300 ${selectedImage === image
                            ? "border-blue-600"
                            : "border-gray-200 dark:border-slate-700"
                            }`}>

                        <Image
                            src={image}
                            alt={`${product.name} - Thumbnail ${index + 1}`}
                            width={80}
                            height={80}
                            className="h-20 w-20 object-cover transition-transform duration-300 hover:scale-105"
                        />

                    </button>

                ))}

            </div>

            {/* Main Image */}

            <div className="relative flex-1 overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900">

                <AnimatePresence mode="wait">

                    <motion.div
                        key={selectedImage}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="relative h-105 w-full"
                    >
                        <Image
                            src={selectedImage}
                            alt={product.name}
                            fill
                            priority
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-contain"
                        />
                    </motion.div>

                </AnimatePresence>

            </div>
        </div>
    );
}