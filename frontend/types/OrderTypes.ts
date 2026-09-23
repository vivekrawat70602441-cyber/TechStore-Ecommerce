export type OrderStatus =
    | "Pending"
    | "Confirmed"
    | "Shipped"
    | "Delivered"
    | "Cancelled";

export interface OrderProduct {
    product: {
        _id: string;
        name: string;
        image?: string;
        price?: number;
        images?: string[];
    };
    quantity: number;
    price: number;
}

export interface OrderUser {
    _id: string;
    name: string;
    email: string;
}

export interface Order {
    _id: string;
    user: OrderUser;
    products: OrderProduct[];
    totalPrice: number;

    shippingAddress: {
        fullName: string;
        email: string;
        phone: string;
        address: string;
        city: string;
        state: string;
        pincode: string;
    };

    status: OrderStatus;
    createdAt: string;
    updatedAt: string;
}