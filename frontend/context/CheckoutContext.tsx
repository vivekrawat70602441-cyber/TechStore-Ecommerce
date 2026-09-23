"use client";

import {
    createContext,
    useContext,
    useState,
    ReactNode,
} from "react";

import type { Product } from "@/types/product";

interface CheckoutItem extends Product {
    quantity: number;
}

interface CheckoutContextType {
    buyNowItem: CheckoutItem | null;

    buyNow: (
        product: Product,
        quantity: number
    ) => void;

    clearBuyNow: () => void;
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

export function CheckoutProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [buyNowItem, setBuyNowItem] = useState<CheckoutItem | null>(null);

    const buyNow = (
        product: Product,
        quantity: number
    ) => {
        setBuyNowItem({
            ...product,
            quantity,
        });
    };

    const clearBuyNow = () => {
        setBuyNowItem(null);
    };

    return (
        <CheckoutContext.Provider
            value={{
                buyNowItem,
                buyNow,
                clearBuyNow,
            }}
        >
            {children}
        </CheckoutContext.Provider>
    );
}

export function useCheckout() {
    const context = useContext(CheckoutContext);

    if (!context) {
        throw new Error(
            "useCheckout must be used inside CheckoutProvider"
        );
    }
    return context;
}