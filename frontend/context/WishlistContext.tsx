"use client";

import { createContext, useCallback, useContext, useEffect, useState, ReactNode, } from "react";
import type { Product } from "@/types/product";
import type { WishlistItem } from "@/types/wishlist";
import { useAuth } from "@/context/AuthContext";
import { authFetch } from "@/lib/authFetch";

const API = process.env.NEXT_PUBLIC_API_URL;

interface WishlistContextType {
    wishlist: WishlistItem[];
    addToWishlist: (product: Product) => Promise<void>;
    removeFromWishlist: (wishlistId: string) => Promise<void>;
    isInWishlist: (productId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
    const { token, loading: authLoading } = useAuth();

    // Fetch wishlist from Backend

    const fetchWishlist = useCallback(async () => {

         try {

            if(!token) return;

            if (!API) {
                throw new Error("NEXT_PUBLIC_API_URL is not configured");
            }

            const response = await authFetch(
                `${API}/wishlist`,
                 {
                 }
            );

            const data = await response.json();

            if (!response.ok) {
                console.log(data.message);
                return;
            }

            setWishlist(data.wishlist);

         }  catch (error) {

            console.error(error);
         }
    }, [token]);

    // Load Wishlist on Page Load

        useEffect(() => {
            if (!authLoading) {
              void fetchWishlist();
            }
        }, [authLoading, fetchWishlist]);

    useEffect(() => {

        console.log("Wishlist Updated:", wishlist);
    }, [wishlist]);

    // Add Product

    const addToWishlist = async (product: Product) => {
        try {

            const response = await authFetch(`${API}/wishlist`, {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",

                },

                body: JSON.stringify({
                    productId: product._id,
                }),
            }
        );

            const data = await response.json();

            if (!response.ok) {
                alert(data.message);
                return;
            }

            // Refresh Wishlist
            await fetchWishlist();

        } catch (error) {
            console.error(error);
        }
    };

  // Remove Product

    const removeFromWishlist = async (wishlistId: string) => {
       
        try {

            const response = await authFetch(
                `${API}/wishlist/${wishlistId}`,
                {
                    method: "DELETE",

                    headers: {

                    },
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(data.message);
                return;
            }

            await fetchWishlist();

        } catch (error) {
            console.error(error);
        }

    };

     // Check Product

    const isInWishlist = (productId: string) => {
        return wishlist.some(
            (item) => item.product._id === productId
        );
    };


    return (
        <WishlistContext.Provider
            value={{
                wishlist,
                addToWishlist,
                removeFromWishlist,
                isInWishlist,
            }}
        >
            {children}
        </WishlistContext.Provider>
    );
}

export function useWishlist() {
    const context = useContext(WishlistContext);

    if (!context) {
        throw new Error(
            "useWishlist must be used inside WishlistProvider"
        );
    }

    return context;
}
