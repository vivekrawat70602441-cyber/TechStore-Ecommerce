import type { Product } from "./product";

export interface WishlistItem {
    _id: string;
    user?: string;
    product: Product;
}