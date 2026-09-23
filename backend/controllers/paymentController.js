import crypto from "crypto";
import razorpay from "../config/razorpay.js";
import Product from "../models/Product.js";
import Payment from "../models/Payment.js";
import Order from "../models/Order.js";
import { calculatePricing } from "../utils/pricing.js";

export const createPaymentOrder = async (req, res) => {
    try {
        const { products, shippingAddress } = req.body;
        const userId = req.user.userId;

        if (!Array.isArray(products) || products.length === 0) {
            return res.status(400).json({
                message: "No products found",
            });
        }

        if (!shippingAddress) {
            return res.status(400).json({
                message: "Shipping address is required",
            });
        }

        const productIds = products.map(
            (item) => item.product
        );

        const dbProducts = await Product.find({
            _id: { $in: productIds },
        });

        if (dbProducts.length !== productIds.length) {
            return res.status(400).json({
                message: "One or more products not found",
            });
        }

        let subtotal = 0;

        for (const item of products) {
            const product = dbProducts.find(
                (dbProduct) =>
                    dbProduct._id.toString() ===
                    item.product.toString()
            );

            if (!product) {
                return res.status(404).json({
                    message: "Product not found",
                });
            }

            const quantity = Number(item.quantity);

            if (!Number.isInteger(quantity) || quantity <= 0) {
                return res.status(400).json({
                    message: `Invalid quantity for ${product.name}`,
                });
            }

            if (product.stock < quantity) {
                return res.status(400).json({
                    message: `${product.name} is out of stock`,
                });
            }
            subtotal += product.price * quantity;
        }

        const pricing = calculatePricing(subtotal);

        const {
            shipping,
            tax,
            total: finalTotal,
        } = pricing;

        if (!Number.isFinite(finalTotal) || finalTotal <= 0) {
            return res.status(400).json({
                message: "Invalid payment amount",
            });
        }

        const amountInPaise = Math.round(finalTotal * 100);

        if (!Number.isInteger(amountInPaise) || amountInPaise <= 0) {
            return res.status(400).json({
                message: "Invalid payment amount",
            });
        }

        const razorpayOrder =
            await razorpay.orders.create({
                amount: amountInPaise,
                currency: "INR",
                receipt: `receipt_${Date.now()}`,
            });

        const payment = await Payment.create({
            user: userId,
            razorpayOrderId: razorpayOrder.id,
            amount: finalTotal,
            currency: "INR",
            status: "created",
        });

        return res.status(201).json({
            message: "Payment order created",
            razorpayOrderId: razorpayOrder.id,
            amount: razorpayOrder.amount,
            currency: razorpayOrder.currency,
            key: process.env.RAZORPAY_KEY_ID,
            paymentId: payment._id,
            pricing: {
                subtotal,
                shipping,
                tax,
                total: finalTotal,
            },
        });

    } catch (error) {
        console.error("Create payment order error:", error);
        return res.status(500).json({
            message:
                error instanceof Error
                    ? error.message
                    : "Failed to create payment order",
        });
    }
};

export const verifyPayment = async (req, res) => {
    const reservedProducts = [];
    let orderCreated = false;

    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            products,
            shippingAddress,
        } = req.body;

        const userId = req.user.userId;

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !Array.isArray(products) || products.length === 0 || !shippingAddress) {
            return res.status(400).json({
                message:
                    "Payment verification data is incomplete",
            });
        }

        const payment = await Payment.findOne({
            razorpayOrderId:
                razorpay_order_id,

            user: userId,
        });

        if (!payment) {
            return res.status(404).json({
                message:
                    "Payment record not found",
            });
        }

        if (payment.status === "paid") {
            const existingOrder =
                await Order.findOne({
                    payment: payment._id,
                    user: userId,
                });

            if (existingOrder) {
                return res.status(200).json({
                    message:
                        "Payment already verified and order already created",

                    order: existingOrder,
                });
            }
        }

        const serverOrderId = payment.razorpayOrderId;

        const generatedSignature =
            crypto
                .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
                .update(`${serverOrderId}|${razorpay_payment_id}`)
                .digest("hex");

        const generatedBuffer =
            Buffer.from(
                generatedSignature,
                "utf8"
            );

        const receivedBuffer =
            Buffer.from(
                razorpay_signature,
                "utf8"
            );

        const signatureMatches = generatedBuffer.length === receivedBuffer.length && crypto.timingSafeEqual(generatedBuffer, receivedBuffer);

        if (!signatureMatches) {
            payment.status = "failed";
            await payment.save();

            return res.status(400).json({
                message:
                    "Payment verification failed",
            });
        }

        const razorpayOrder =
            await razorpay.orders.fetch(
                serverOrderId
            );

        if (razorpayOrder.amount !== Math.round(payment.amount * 100)) {
            payment.status = "failed";

            await payment.save();

            return res.status(400).json({
                message:
                    "Payment amount mismatch",
            });
        }

        const razorpayPayment =
            await razorpay.payments.fetch(
                razorpay_payment_id
            );

        if (razorpayPayment.order_id !== serverOrderId) {
            payment.status = "failed";

            await payment.save();

            return res.status(400).json({
                message:
                    "Payment does not belong to this order",
            });
        }

        if (razorpayPayment.amount !== razorpayOrder.amount) {
            payment.status = "failed";

            await payment.save();

            return res.status(400).json({
                message:
                    "Razorpay payment amount mismatch",
            });
        }

        if (razorpayPayment.status !== "captured") {
            return res.status(400).json({
                message:
                    `Payment is not captured. Current status: ${razorpayPayment.status}`,
            });
        }

        const productIds = products.map(
            (item) => item.product
        );

        const dbProducts =
            await Product.find({
                _id: { $in: productIds },
            });

        if (dbProducts.length !== productIds.length) {
            return res.status(400).json({
                message:
                    "One or more products not found",
            });
        }

        const orderProducts = [];

        let subtotal = 0;

        for (const item of products) {
            const product =
                dbProducts.find(
                    (dbProduct) =>
                        dbProduct._id.toString() ===
                        item.product.toString()
                );

            if (!product) {
                return res.status(404).json({
                    message:
                        "Product not found",
                });
            }

            const quantity = Number(item.quantity);

            if (!Number.isInteger(quantity) || quantity <= 0) {
                return res.status(400).json({
                    message:
                        `Invalid quantity for ${product.name}`,
                });
            }

            if (product.stock < quantity) {
                return res.status(400).json({
                    message:
                        `${product.name} is out of stock`,
                });
            }

            const itemTotal = product.price * quantity;
            subtotal += itemTotal;

            orderProducts.push({
                product: product._id,
                quantity,
                price: product.price,
                costPrice: product.costPrice,
            });
        }

        const pricing =
            calculatePricing(subtotal);

        const {
            shipping,
            tax,
            total: finalTotal,
        } = pricing;

        const calculatedAmountInPaise = Math.round(finalTotal * 100);

        if (calculatedAmountInPaise !== razorpayOrder.amount) {
            return res.status(400).json({
                message:
                    "Final order amount does not match Razorpay payment amount",
            });
        }

        for (const item of orderProducts) {
            const updatedProduct = await Product.findOneAndUpdate(
                {
                    _id: item.product,
                    stock: { $gte: item.quantity },
                },
                {
                    $inc: { stock: -item.quantity },
                },
                {
                    returndocument: 'after',
                }
            );

            if (!updatedProduct) {
                for (const reservedProduct of reservedProducts) {
                    await Product.findByIdAndUpdate(
                        reservedProduct.product,
                        { $inc: { stock: reservedProduct.quantity } }
                    );
                }

                return res.status(409).json({
                    message: "One or more products are no longer in stock",
                });
            }

            reservedProducts.push({
                product: item.product,
                quantity: item.quantity,
            });
        }

        payment.status = "paid";

        payment.razorpayPaymentId = razorpay_payment_id;

        payment.razorpaySignature = razorpay_signature;

        await payment.save();

        const order =
            await Order.create({
                user: userId,
                products: orderProducts,

                shippingAddress: {
                    fullName: shippingAddress.fullName.trim(),
                    email: shippingAddress.email.trim(),
                    phone: shippingAddress.phone.trim(),
                    address: shippingAddress.address.trim(),
                    city: shippingAddress.city.trim(),
                    state: shippingAddress.state.trim(),
                    pincode: shippingAddress.pincode.trim(),
                },

                totalPrice: finalTotal,
                payment: payment._id,
                status: "Confirmed",
            });

        orderCreated = true;

        return res.status(200).json({
            message:
                "Payment verified and order created successfully",

            order,

            pricing: {
                subtotal,
                shipping,
                tax,
                total: finalTotal,
            },
        });

    } catch (error) {
        if (!orderCreated) {
            for (const reservedProduct of reservedProducts) {
                await Product.findByIdAndUpdate(
                    reservedProduct.product,
                    { $inc: { stock: reservedProduct.quantity } }
                );
            }
        }

        console.error(
            "Verify payment error:",
            error
        );

        return res.status(500).json({
            message:
                error instanceof Error
                    ? error.message
                    : "Payment verification failed",
        });
    }
};