import express from "express";
import { getOrders, getAllOrders, updateOrderStatus } from "../controllers/orderController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

// User Routes

router.get(
    "/",
    authMiddleware,
    getOrders
);

// Admin Routes
router.get(
    "/admin",
    authMiddleware,
    adminMiddleware,
    getAllOrders
);

router.patch(
    "/admin/:id/status",
    authMiddleware,
    adminMiddleware,
    updateOrderStatus
);

export default router;