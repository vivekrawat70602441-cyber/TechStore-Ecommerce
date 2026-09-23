import express from "express";

import { subscribeNewsletter, getSubscribers } from "../controllers/newsletterController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post("/", subscribeNewsletter);
router.get("/", authMiddleware, adminMiddleware, getSubscribers);

export default router;