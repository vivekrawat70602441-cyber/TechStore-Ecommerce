export interface Product {
    _id: string;
    id?: string;
    slug: string;
    name: string;
    brand: string;
    description: string;
    sku: string;
    stock: number;
    category: string;
    image: string;
    images: string[];
    price: number;
    originalPrice: number;
    rating: number;
    reviews: number;
    discount: number;
    isBestSeller?: boolean;
    NewArrival?: boolean;
    isSale?: boolean;
}