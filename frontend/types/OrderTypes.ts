export type OrderStatus =
    | "Pending"
    | "Confirmed"
    | "Shipped"
    | "Delivered"
    | "Cancelled";

export interface OrderStatusHistory {
    status: OrderStatus;
    message: string;
    timestamp: string;
}

export interface OrderProduct {
    product: {
        _id: string;
        name: string;
        image?: string;
        images?: string[];
        price?: number;
    };
    quantity: number;
    price: number;
}

export interface OrderUser {
    _id: string;
    name: string;
    email: string;
}

export interface ShippingAddress {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
}
export interface Order {
    _id: string;
    user: OrderUser;
    products: OrderProduct[];
    totalPrice: number;
    shippingAddress: ShippingAddress;
    status: OrderStatus;
    statusHistory?: OrderStatusHistory[];
    createdAt: string;
    updatedAt: string;
    dispatchlocation?: OrderMapLocation;
    deliveryLocation?: OrderMapLocation;
}

export interface OrderMapLocation {
    name: string;
    address: string;
    latitude: number;
    longitude: number;
    source?: "warehouse" | "custom";
    warehouseId?: string | null;
}