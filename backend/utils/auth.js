import jwt from "jsonwebtoken";

export const generateAuthToken = (user) => {
    return jwt.sign(
        {
            userId: user._id,
            role: user.role,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d",
        }
    );
};