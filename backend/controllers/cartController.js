import Cart from "../models/Cart.js";

export const addToCart = async (req, res) => {
    try {

        const { productId, quantity } = req.body;

        const userId = req.user.userId;

        const existingItem = await Cart.findOne({
            user: userId,
            product: productId,
        });

        if (existingItem) {

            existingItem.quantity += quantity;

            await existingItem.save();

            return res.status(200).json({
                message: "Cart updated successfully",
                cart: existingItem,
            });
        }

        const cartItem = await Cart.create({
            user: userId,
            product: productId,
            quantity,
        });

        res.status(201).json({
            message: "Product added to cart",
            cart: cartItem,
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });

    }
};