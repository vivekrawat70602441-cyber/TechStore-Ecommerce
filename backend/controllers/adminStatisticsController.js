import User from "../models/User.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";

export const getAdminStatistics = async (req, res) => {
    try {

        const totalUsers = await User.countDocuments();
        const totalProducts = await Product.countDocuments();
        const totalOrders = await Order.countDocuments();

        const revenueResult =
            await Order.aggregate([
                {
                    $match: {
                        status: {
                            $ne: "Cancelled",
                        },
                    },
                },

                {
                    $group: {
                        _id: null,
                        totalRevenue: {
                            $sum: "$totalPrice",
                        },
                    },
                },
            ]);

        const totalRevenue =
            revenueResult.length > 0
                ? revenueResult[0].totalRevenue
                : 0;

        const ordersByStatus =
            await Order.aggregate([
                {
                    $group: {
                        _id: "$status",
                        count: {
                            $sum: 1,
                        },
                    },
                },
            ]);

        const statusCounts = {
            Pending: 0,
            Confirmed: 0,
            Shipped: 0,
            Delivered: 0,
            Cancelled: 0,
        };

        ordersByStatus.forEach((item) => {

            statusCounts[item._id] =
                item.count;
        });

        const revenueByMonth =
            await Order.aggregate([
                {
                    $match: {
                        status: {
                            $ne: "Cancelled",
                        },
                    },
                },

                {
                    $unwind: "$products",
                },

                {
                    $lookup: {
                        from: "products",
                        localField: "products.product",
                        foreignField: "_id",
                        as: "productDetails",
                    },
                },

                {
                    $unwind: "$productDetails",
                },

                {
                    $group: {
                        _id: {
                            year: {
                                $year: "$createdAt",
                            },

                            month: {
                                $month: "$createdAt",
                            },
                        },

                        revenue: {
                            $sum: {
                                $multiply: [
                                    "$products.price",
                                    "$products.quantity",
                                ],
                            },
                        },

                        cogs: {
                            $sum: {
                                $multiply: [
                                    "$productDetails.costPrice",
                                    "$products.quantity",
                                ],
                            },
                        },
                    },
                },

                {
                    $project: {
                        _id: 1,
                        revenue: 1,
                        cogs: 1,
                        grossProfit: {
                            $subtract: [
                                "$revenue",
                                "$cogs",
                            ],
                        },
                    },
                },

                {
                    $sort: {
                        "_id.year": 1,
                        "_id.month": 1,
                    },
                },
            ]);

        res.status(200).json({

            message: "Admin statistics fetched successfully",

            overview: {

                totalUsers,
                totalProducts,
                totalOrders,
                totalRevenue,
            },

            ordersByStatus:
                statusCounts,

            revenueByMonth,
        });

    } catch (error) {
        console.error(
            "Admin statistics error:",
            error
        );

        res.status(500).json({
            message: "Failed to fetch admin satistics",

            error:
                error instanceof Error
                    ? error.message
                    : "Unknown error",
        });
    }
};