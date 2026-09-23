import express from "express";
import { registerUser, loginUser, logoutUser, getProfile, getAllUsers, getUserById, updateUser } from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js"
import { validateBody } from "../middleware/validateBody.js";
import { authRateLimiter } from "../middleware/rateLimiters.js";
import { loginSchema, registerSchema } from "../validation/schemas.js";

const router = express.Router();

router.get(
    "/profile",
    authMiddleware,
    getProfile
);

router.get(
    "/admin",
    authMiddleware,
    adminMiddleware,
    getAllUsers
);

router.get(
    "/admin/:id",
    authMiddleware,
    adminMiddleware,
    getUserById
);

router.put(
    "/admin/:id",
    authMiddleware,
    adminMiddleware,
    updateUser
)

router.post(
    "/register",
    authRateLimiter,
    validateBody(registerSchema),
    registerUser
);

router.post(
    "/login",
    authRateLimiter,
    validateBody(loginSchema),
    loginUser
);

router.post("/logout", logoutUser);

export default router;