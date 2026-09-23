import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get(
    "/",
    authMiddleware,
    adminMiddleware,
    (req, res) => {
        res.json({
            message: "Welcome to Admin Dashboard",
            user: req.user,
        });
    }
);

export default router;