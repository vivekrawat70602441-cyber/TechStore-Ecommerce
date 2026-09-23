"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import type { Product } from "@/types/product";

interface CartItem extends Product {
    quantity: number;
}

interface CartContextType {
    cart: CartItem[];
    totalItems: number;
    subtotal: number;

    addToCart: (product: Product, quantity: number) => void;
    increaseQuantity: (id: string) => void;
    decreaseQuantity: (id: string) => void;
    removeFromCart: (id: string) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [cart, setCart] = useState<CartItem[]>([]);

    useEffect(() => {
        const savedCart = localStorage.getItem("cart");

        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);

    // Add Product
    const addToCart = (
        product: Product,
        quantity: number
    ) => {
        setCart((prevCart) => {
            const existing = prevCart.find((item) => item._id === product._id);

            if (existing) {
                return prevCart.map((item) =>
                    item._id === product._id
                        ? {
                            ...item,
                            quantity: item.quantity + quantity,
                        }
                        : item
                );
            }

            return [
                ...prevCart,
                {
                    ...product,
                    quantity: quantity,
                },
            ];
        });
    };

    // Increase Quantity
    const increaseQuantity = (id: string) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item._id === id
                    ? {
                        ...item,
                        quantity: item.quantity + 1,
                    }
                    : item
            )
        );
    };

    // Decrease Quantity
    const decreaseQuantity = (id: string) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item._id === id
                    ? {
                        ...item,
                        quantity: item.quantity > 1
                            ? item.quantity - 1
                            : 1,
                    }
                    : item
            )
        );
    };

    // Remove Product
    const removeFromCart = (id: string) => {
        setCart((prevCart) =>
            prevCart.filter((item) => item._id !== id)
        );
    };

    const clearCart = () => {
        setCart([]);
    };

    useEffect(() => {
        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );
    }, [cart]);

    const totalItems = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const subtotal = cart.reduce(
        (total, item) =>
            total + item.price * item.quantity,
        0
    );
    return (
        <CartContext.Provider
            value={{
                cart,

                totalItems,
                subtotal,

                addToCart,

                increaseQuantity,
                decreaseQuantity,
                removeFromCart,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error("useCart must be used inside CartProvider");
    }

    return context;
}