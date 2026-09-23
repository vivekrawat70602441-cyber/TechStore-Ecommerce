export interface ShippingAddress {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
}

export interface PaymentProduct {
    product: string;
    quantity: number;
}

export interface CreatePaymentOrderRequest {
    products: PaymentProduct[];
    shippingAddress: ShippingAddress;
}

export interface CreatePaymentOrderResponse {
    message: string;
    razorpayOrderId: string;
    amount: number;
    currency: string;
    key: string;
    paymentId: string;

    pricing: {
        subtotal: number;
        shipping: number;
        tax: number;
        total: number;
    };
}

export interface RazorpayPaymentResponse {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
}

export interface VerifyPaymentRequest {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
    products: PaymentProduct[];
    shippingAddress: ShippingAddress;
}

export interface VerifyPaymentResponse {
    message: string;
    order: {
        _id: string;
        user: string;
        products: Array<{
            product: string;
            quantity: string;
            price: number;
        }>;
        shippingAddress: ShippingAddress;
        totalPrice: number;
        payment: string;
        status: string;
    };
}

export interface RazorpayOptions {
    key: string;
    amount: number;
    currency: string;
    name: string;
    description: string;
    order_id: string;

    prefill: {
        name: string;
        email: string;
        contact: string;
    };

    handler: (
        response: RazorpayPaymentResponse
    ) => void | Promise<void>;

    theme?: {
        color?: string;
    };

    modal?: {
        confirm_close?: boolean;
        escape?: boolean;
        backdropclose?: boolean;
        animation?: boolean;
        ondismiss?: () => void;
    };
}