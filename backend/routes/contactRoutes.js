import express from "express";
import { createContact, getContacts } from "../controllers/contactController.js";
import  authMiddleware from "../middleware/authMiddleware.js";
import  adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post("/", createContact);
router.get(
    "/", 
    authMiddleware,
    adminMiddleware,
    getContacts
);

export default router;