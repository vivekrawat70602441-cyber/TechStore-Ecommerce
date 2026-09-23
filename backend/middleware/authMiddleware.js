import jwt from "jsonwebtoken";
import { getAuthTokenFromCookie } from "../utils/authCookie.js";

const authMiddleware = (req, res, next) => {

  try {

    const authHeader = req.headers.authorization;
    const token = getAuthTokenFromCookie(req) ||
        (authHeader?.startsWith("Bearer ")
            ? authHeader.split(" ")[1]
            : null);

    if (!token) {
        return res.status(401).json({
            message: "No token provided",
        });
    }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;

        next();

    } catch (error) {

        return res.status(401).json({
            message: "Invalid or expired token",
        });

    }
    
};

export default authMiddleware;