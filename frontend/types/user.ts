export type UserRole = "user" | "admin";

export interface AdminUser {
    _id: string;
    name: string;
    email: string;
    role: UserRole;
    createdAt: string;
}

export interface UserProduct {
    _id: string;
    name: string;
    price: number;
    images?: string[];
}

export interface UserOrderProduct {
    product: "UserProduct";
    quantity: number;
    price: number;
}

export interface UserOrder {
    _id: string;
    products: UserOrderProduct[];
    totalPrice: number;
    status:
    | "Pending"
    | "Confirmed"
    | "Shipped"
    | "Delivered"
    | "Cancelled";
    createdAt: string;
}

export interface UserDetailsResponse {
    message: string;
    user: AdminUser;
    orders: UserOrder[];
}