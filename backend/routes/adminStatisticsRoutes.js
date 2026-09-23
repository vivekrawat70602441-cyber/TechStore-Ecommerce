import express from "express";
import { getAdminStatistics } from "../controllers/adminStatisticsController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get(
    "/",
    authMiddleware,
    adminMiddleware,
    getAdminStatistics
);

export default router;