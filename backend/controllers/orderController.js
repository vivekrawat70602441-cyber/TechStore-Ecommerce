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

        // 1. Validate the requested status
        if (!ORDER_STATUSES.includes(status)) {
            return res.status(400).json({
                message: "Invalid order status",
            });
        }

        // 2. Find the existing order
        const order = await Order.findById(id);

        if (!order) {
            return res.status(404).json({
                message: "Order not found",
            });
        }

        // 3. Prevent unnecessary duplicate history entries
        if (order.status === status) {
            return res.status(200).json({
                message: "Order already has this status",
                order,
            });
        }

        // 4. Prepare a tracking message
        const trackingMessages = {
            Pending: "Your order is awaiting confirmation.",
            Confirmed: "Your order has been confirmed.",
            Shipped: "Your order has been shipped.",
            Delivered: "Your order has been delivered.",
            Cancelled: "Your order has been cancelled.",
        };

        // 5. Update the current status
        order.status = status;

        // 6. Add a new tracking event
        order.statusHistory.push({
            status,
            message: trackingMessages[status],
            timestamp: new Date(),
        });

        // 7. Save both changes to MongoDB
        await order.save();

        // 8. Return the updated order with its related data
        await order.populate([
            { path: "user", select: "name email" },
            { path: "products.product" },
            { path: "payment" },
        ]);

        return res.status(200).json({
            message: "Order status updated successfully",
            order,
        });
    } catch (error) {
        console.error("Update order status error:", error);

        return res.status(500).json({
            message:
                error instanceof Error
                    ? error.message
                    : "Failed to update order status",
        });
    }
};

/* Admin - Update Order Dispatch Location */
export const updateOrderDispatchLocation = async (req, res) => {
    try {
        const { id } = req.params;
        const{ name, address, latitude, longitude, source, warehouseId } = req.body;

        // Validate required text fields
        if ( typeof name !== "string" || !name.trim() || typeof address !== "string" || !address.trim()) {
            return res.status(400).json({
                message: "Location name and address are required",
            });
        }

        // Validate location source
        if (!["warehouse", "custom"].includes(source)) {
            return res.status(400).json({
                message: "Invalid dispatch location source",
            });
        }

        // Reject empty coordinates before converting to numbers
        if (
            latitude === undefined || 
            latitude === null ||
            latitude === "" ||
            longitude === undefined ||
            longitude === null ||
            longitude === ""
        ) {
            return res.status(400).json({
                message: "Latitude and longitude are required",
            });
        }

        const lat = Number(latitude);
        const lng = Number(longitude);

        if (
            !Number.isFinite(lat) ||
            !Number.isFinite(lng) ||
            lat < -90 ||
            lat > 90 ||
            lng < -180 ||
            lng > 180
        ) {
            return res.status(400).json({
                message: "Invalid latitude or longitude",
            });
        }

        const order = await Order.findById(id);

        if (!order) {
            return res.status(404).json({
                message: "Order not found",
            });
        }

        order.dispatchlocation = {
            name: name.trim(),
            address: address.trim(),
            latitude: lat,
            longitude: lng,
            source,
            warehouseId:
               source === "warehouse" && warehouseId
                   ? String(warehouseId)
                   : null,
        };

        await order.save();
        return res.status(200).json({
            message: "Dispatch location updated successfully",
            dispatchLocation: order.dispatchlocation,
        });
    } catch (error) {
        console.error("Update dispatch location error:", error);

        return res.status(500).json({
            message: 
               error instanceof Error
                   ? error.message
                   : "Failed to update dispatch location",
        });
    }
};

export const updateOrderDeliveryLocation = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, address, latitude, longitude } = req.body;

        if (
            typeof name !== "string" ||
            !name.trim() ||
            typeof address !== "string" ||
            !address.trim()
        ) {
            return res.status(400).json({
                message: "Location name and address are required",
            });
        }

        const lat = Number(latitude);
        const lng = Number(longitude);

        if (
            latitude === undefined || latitude === null || latitude === "" ||
            longitude === undefined || longitude === null || longitude === "" ||
            !Number.isFinite(lat) || !Number.isFinite(lng) ||
            lat < -90 || lat > 90 || lng < -180 || lng > 180
        ) {
            return res.status(400).json({
                message: "Valid latitude and longitude are required",
            });
        }

        const order = await Order.findById(id);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        order.deliveryLocation = {
            name: name.trim(),
            address: address.trim(),
            latitude: lat,
            longitude: lng,
        };

        await order.save();

        return res.status(200).json({
            message: "Customer delivery location updated successfully",
            deliveryLocation: order.deliveryLocation,
        });
    } catch (error) {
        console.error("Update delivery location error:", error);

        return res.status(500).json({
            message: error instanceof Error
                ? error.message
                : "Failed to update delivery location",
        });
    }
};