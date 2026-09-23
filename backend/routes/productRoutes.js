import express from "express";
import {
    getProducts,
    getProductBySlug,
    createProduct,
    updateProduct,
    deleteProduct,
    getAdminProducts,
} from "../controllers/productController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
import { validateBody } from "../middleware/validateBody.js";
import {
    createProductSchema,
    updateProductSchema,
} from "../validation/schemas.js";

const router = express.Router();

// PUBLIC PRODUCT ROUTES

// GET /products
router.get("/",getProducts);

// GET /products/admin
router.get(
    "/admin",
    authMiddleware,
    adminMiddleware,
    getAdminProducts
);

//GET /products/:slug
router.get("/:slug", getProductBySlug);

// ADMIN PRODUCT ROUTES

// POST /products
router.post(
    "/",
    authMiddleware,
    adminMiddleware,
    validateBody(createProductSchema),
    createProduct
);

// PUT /products/: id
router.put(
    "/:id",
    authMiddleware,
    adminMiddleware,
    validateBody(updateProductSchema),
    updateProduct
);

// DELETE /products/;id
router.delete(
    "/:id",
    authMiddleware,
    adminMiddleware,
    deleteProduct
);

export default router;