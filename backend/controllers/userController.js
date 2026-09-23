import User from "../models/User.js";
import Order from "../models/Order.js";
import { generateAuthToken } from "../utils/auth.js";
import { hashPassword, comparePassword } from "../utils/password.js";
import { clearAuthCookie, setAuthCookie } from "../utils/authCookie.js";

export const registerUser = async (req, res) => {

    try {

        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
            });
        }

        const hashedPassword = await hashPassword(password);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

       const token = generateAuthToken(user);

        setAuthCookie(res, token);

        res.status(201).json({
            message: "User registered successfully",
            user: {

                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Invalid email or password",
            });
        }

        const isMatch = await comparePassword(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid email or password",
            });
        }

      const token = generateAuthToken(user);

                setAuthCookie(res, token);

        res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const logoutUser = (req, res) => {
    clearAuthCookie(res);
    res.status(200).json({ message: "Logout successful" });
};

export const getProfile = async (req, res) => {

    try {

        const user = await User.findById(req.user.userId)
            .select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        res.status(200).json(user);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
            .select("-password")
            .sort({
                createdAt: -1,
            })
            .lean();

        res.status(200).json({
            message: "Users fetched successfully",
            users,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id)
            .select("-password")
            .lean();

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        const orders = await Order.find({
            user: id,
        })
            .populate("products.product")
            .sort({
                createdAt: -1,
            })
            .lean();

        res.status(200).json({
            message: "User details fetched successfully",
            user,
            orders,
        });
    } catch (error) {
        console.error("Get user details error:", error);
        res.status(500).json({
            message: error.message,
        });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { name, email, role } = req.body;
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { name, email, role },
            {
                returndocument: 'after',
                runValidators: true,
            }
        ).select("-password");

            if (!user) {
                return res.status(404).json({
                    message: "User not found",
                });
            }
            res.status(200).json({
                message: "User updated successfully",
                user,
            });
        }  catch (error) {
            res.status(500).json({
                message: error.message,
            });
        }
    };
