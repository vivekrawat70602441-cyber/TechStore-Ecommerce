import Order from "../models/Order.js";
import { ORDER_STATUSES } from "../utils/orderConstants.js";

// GET User Orders
export const getOrders = async (req, res) => {
    try {
        const userId = req.user.userId;
        const orders = await Order.find({
            user: userId,
        })

            .populate("products.product")
            .populate("payment")
            .sort({
                createdAt: -1,
            })
            .lean();

        res.status(200).json({
            message: "Orders fetched successfully",
            orders,
        });
    } catch (error) {
        console.error("Get user orders error:", error);
        res.status(500).json({
            message:
                error instanceof Error
                    ? error.message
                    : "Failed to fetch orders",
        });
    }
};

// Admin - Get All Orders
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate("user", "name email")
            .populate("products.product")
            .populate("payment")
            .sort({
                createdAt: -1,
            })
            .lean();

        res.status(200).json({
            message: "All orders fetched successfully",
            orders,
        });
    } catch (error) {
        console.error("Get all orders error:", error);
        res.status(500).json({
            message:
                error instanceof Error
                    ? error.message
                    : "Failed to fetch orders",
        });
    }
};

// Admin - Update Order Status
export const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        // Validate status
        if (!ORDER_STATUSES.includes(status)) {
            return res.status(400).json({
                message: "Invalid order status",
            });
        }

        // Find and update order
        const order = await Order.findByIdAndUpdate(
            id,
            {
                status,
            },
            {
                returnDocument: 'after',
                runValidators: true,
            }
        )

            .populate("user", "name email")
            .populate("products.product")
            .populate("payment");

        // Order not found
        if (!order) {
            return res.status(404).json({
                message: "Order not found",
            });
        }

        res.status(200).json({
            message: "Order status updated successfully",
            order,
        });
    } catch (error) {
        console.error("Update order status error:", error);

        res.status(500).json({
            message:
                error instanceof Error
                    ? error.message
                    : "Failed to update order status",
        });
    }
};