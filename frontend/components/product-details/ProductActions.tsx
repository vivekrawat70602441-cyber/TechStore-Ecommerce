"use client";

import { Heart, Minus, Plus, ShoppingCart } from "lucide-react";
import { useState } from "react";

import { useCart } from "@/context/CartContext";
import type { Product } from "@/types/product";
import { toast } from "sonner";
import { useWishlist } from "@/context/WishlistContext";
import { useRouter } from "next/navigation";
import { useCheckout } from "@/context/CheckoutContext";
import ButtonAnimation from "../animations/ButtonAnimation";

interface ProductActionsProps {
    product: Product;
}


export default function ProductActions({
    product,
}: ProductActionsProps) {
    const [quantity, setQuantity] = useState(1);

    const { addToCart } = useCart();
    const { buyNow } = useCheckout();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

    const router = useRouter();

    const increaseQuantity = () => {
        if (quantity < product.stock) {
            setQuantity((prev) => prev + 1);
        }
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity((prev) => prev - 1);
        }
    };

    return (
        <div className="mt-8 space-y-6">

            {/* Quantity */}
            <div>
                <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
                    Quantity
                </h3>

                <div className="flex w-fit items-center overflow-hidden rounded-xl border border-gray-300 dark:border-slate-700">

                    <button
                        onClick={decreaseQuantity}
                        disabled={quantity === 1}
                        className="p-3 transition hover:bg-gray-100 dark:hover:bg-slate-800"
                    >
                        <Minus size={18} />
                    </button>

                    <span className="px-6 font-semibold text-gray-900 dark:text-white">
                        {quantity}
                    </span>

                    <button
                        onClick={increaseQuantity}
                        disabled={quantity >= product.stock}
                        className="p-3 hover:bg-gray-100"
                    >
                        <Plus size={18} />
                    </button>

                </div>
            </div>

            {/* Buttons */}
            <div className="space-y-4">

                <ButtonAnimation>

                    <button
                        disabled={product.stock === 0}
                        onClick={() => {
                            addToCart(product, quantity);

                            toast.success(
                                `${quantity} * ${product.name} added to cart`
                            );

                            setQuantity(1);
                        }}

                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
                    >
                        <ShoppingCart size={20} />
                        Add to Cart
                    </button>

                </ButtonAnimation>

                <ButtonAnimation>
                    <button
                        onClick={() => {
                            if (isInWishlist(product._id)) {

                                removeFromWishlist(product._id);

                                toast.success("Removed from Wishlist");

                            } else {

                                addToWishlist(product);

                                toast.success("Added to Wishlist");

                            }
                        }}
                        className="flex w-full items-center justify-center gap-2 rounded-xl border py-3 font-semibold transition hover:bg-gray-100 dark:border-slate-700 dark:hover:bg-slate-800"
                    >
                        <Heart
                            size={20}
                            className={
                                isInWishlist(product._id)
                                    ? "fill-red-500 text-red-500"
                                    : ""
                            }
                        />

                        {isInWishlist(product._id)
                            ? "Remove from Wishlist"
                            : "Add to Wishlist"}
                    </button>

                </ButtonAnimation>

                <ButtonAnimation>

                    <button
                        disabled={product.stock === 0}
                        onClick={() => {
                            buyNow(product, quantity);
                            router.push("/checkout");
                        }}
                        className="w-full rounded-xl bg-black py-3 font-semibold text-white transition hover:bg-gray-800">
                        Buy Now
                    </button>

                </ButtonAnimation>

            </div>

            {/* Extra Info */}
            <div className="space-y-2 border-t pt-6 text-sm text-gray-600 dark:border-slate-700 dark:text-gray-400">
                <p>🚚 Free Delivery</p>
                <p>🔒 Secure Payment</p>
                <p>↩️ 7-Day Easy Return</p>
            </div>

        </div>
    );
}