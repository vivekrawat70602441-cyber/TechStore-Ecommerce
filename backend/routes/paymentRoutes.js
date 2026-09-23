import express from "express";

import { createPaymentOrder, verifyPayment } from "../controllers/paymentController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
    "/create-order",
    authMiddleware,
    createPaymentOrder
);

router.post(
    "/verify",
    authMiddleware,
    verifyPayment
);

export default router;