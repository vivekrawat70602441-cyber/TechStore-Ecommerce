
import Product from "../models/Product.js";

// GET /products
export const getProducts = async (req, res) => {
    try {

        const products = await Product.find();

        res.json(products);
    } catch (error) {

        res.status(500).json({
            message: error.message,
        });
    }
};

// GET /products/admin
export const getAdminProducts = async (req, res) => {
    try {
        const products = await Product.find();

        res.json(products);
        
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}

// GET /products/:slug
export const getProductBySlug = async (req, res) => {
    try {
        const { slug } = req.params;

        const product = await Product.findOne({ slug });

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        res.json(product);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// POST /products
export const createProduct = async (req, res) => {

    try {

        const product = await Product.create(req.body);

        res.status(201).json({
            message: "Product added successfully",
            product,
        });
    } catch (error) {

        res.status(400).json({
            message: error.message,
        });

    }
};

// PUT /products/:id
export const updateProduct = async (req, res) => {

    try {

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                returnDocument: 'after',
                runValidators: true,
            }
        );

        if (!updatedProduct) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        res.json({
            message: "Product updated successfully",
            product: updatedProduct,
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};

// DELETE /products/:id

export const deleteProduct = async (req, res) => {

    try {

        const deletedProduct = await Product.findByIdAndDelete(
            req.params.id
        );

        if (!deletedProduct) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        res.json({
            message: "Product deleted successfully",
            product: deletedProduct,
        });
    } catch (error) {

        res.status(500).json({
            message: error.message,
        });
    }
};
