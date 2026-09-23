import Wishlist from "../models/Wishlist.js";

export const addToWishlist = async (req, res) => {
    try {

        const { productId } = req.body;

        const userId = req.user.userId;

        const existingItem = await Wishlist.findOne({
            user: userId,
            product: productId,
        });

        if (existingItem) {
            return res.status(400).json({
                message: "Product already exists in wishlist",
            });
        }

        const wishlistItem = await Wishlist.create({
            user: userId,
            product: productId,
        });

        res.status(201).json({
            message: "Product added to wishlist",
            wishlist: wishlistItem,
        });

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }
};

export const getWishlist = async (req, res) => {
    try {

        const userId = req.user.userId;

        const wishlist = await Wishlist.find({
            user: userId,
        }).populate("product");

        res.status(200).json({
            wishlist,
        });

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }
};

export const removeFromWishlist = async (req, res) => {
    try {

        const { id } = req.params;

        const userId = req.user.userId;

        const wishlistItem = await Wishlist.findOneAndDelete({
            _id: id,
            user: userId,
        });

        if (!wishlistItem) {
            return res.status(404).json({
                message: "Wishlist item not found",
            });
        }
        
        res.status(200).json({
            message: "Product removed from wishlist",
        });

    } catch (error) {

         res.status(500).json({
            message: error.message,
         })
    }
}