"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { motion } from "motion/react";

import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

interface Props {
   product: Product;
}

export default function ProductCard({ product }: Props) {
   const { addToCart } = useCart();

   const {
      wishlist,
      addToWishlist,
      removeFromWishlist,
   } = useWishlist();

   const isWishlisted = wishlist.some(
      (item) => item._id === product._id
   );

   return (
      <Link href={`/products/${product.slug}`}>
         <motion.div
            whileHover={{ y: -8 }}
            transition={{ duration: 0.25 }}
            className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-xl dark:border-slate-700 dark:bg-slate-900"
         >

            {/* Image */}
            <div className="relative">

               {/* Discount Badge */}
               <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="absolute left-4 top-4 z-10 rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white"
               >
                  -{product.discount}%
               </motion.span>

               {/* Dynamic Badges */}
               <div className="absolute left-4 top-14 z-10 flex flex-col gap-2">

                  {product.isBestSeller && (
                     <motion.span
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold text-white shadow"
                     >
                        🔥 Best Seller
                     </motion.span>
                  )}

                  {product.NewArrival && (
                     <motion.span
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="rounded-full bg-green-600 px-3 py-1 text-xs font-semibold text-white shadow"
                     >
                        🆕 New
                     </motion.span>
                  )}

                  {product.isSale && (
                     <motion.span
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="rounded-full bg-purple-600 px-3 py-1 text-xs font-semibold text-white shadow"
                     >
                        ⚡ Sale
                     </motion.span>
                  )}

               </div>

               {/* wishlist */}
               <button
                  onClick={(e) => {
                     e.preventDefault();

                     if (isWishlisted) {
                        removeFromWishlist(product._id);
                     } else {
                        addToWishlist(product);
                     }
                  }}
                  className="absolute right-4 top-4 z-10 rounded-full bg-white p-2 shadow transition-colors duration-300 dark:bg-slate-800 dark:text-white"
               >
                  <Heart
                     size={18}
                     className={`transition ${isWishlisted
                        ? "fill-red-500 text-red-500"
                        : "text-gray-700 dark:text-white"
                        }`}
                  />
               </button>

               <div className="relative h-64 overflow-hidden bg-white dark:bg-slate-800">
                  <Image
                     src={product.image}
                     alt={product.name}
                     width={220}
                     height={220}
                     className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
                  />
               </div>
            </div>

            <div className="space-y-3 p-5">

               <p className="text-sm text-blue-600 dark:text-blue-400">
                  {product.brand}
               </p>

               <h3 className="line-clamp-2 text-lg font-semibold text-gray-900 dark:text-white">
                  {product.name}
               </h3>

               <div className="flex items-center gap-2">

                  <Star
                     size={18}
                     className="fill-yellow-400 text-yellow-400"
                  />

                  <span className="text-gray-700 dark:text-gray-300">
                     {product.rating}
                  </span>

                  <span className="text-gray-500 dark:text-gray-400">
                     ({product.reviews})
                  </span>

               </div>

               <div className="flex items-center gap-3">

                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                     ₹{product.price.toLocaleString("en-IN")}
                  </span>

                  <span className="text-gray-400 dark:text-gray-500 line-through">
                     ₹{product.originalPrice.toLocaleString("en-IN")}
                  </span>

               </div>

               <motion.button
                  whileTap={{ scale: 0.96 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => addToCart(product, 1)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
               >
                  <ShoppingCart size={18} />
                  Add to Cart
               </motion.button>

            </div>
         </motion.div>
      </Link>
   );
}