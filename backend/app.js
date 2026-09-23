import express from "express";
import cors from "cors";

import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import adminStatisticsRoutes from "./routes/adminStatisticsRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import newsletterRoutes from "./routes/newsletterRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));
app.use(express.json());
app.use("/products", productRoutes);
app.use("/users", userRoutes);
app.use("/cart", cartRoutes);
app.use("/wishlist", wishlistRoutes);
app.use("/orders", orderRoutes);
app.use("/payments", paymentRoutes);
app.use("/admin", adminRoutes);
app.use("/admin/statistics", adminStatisticsRoutes);
app.use("/contact", contactRoutes);
app.use("/newsletter", newsletterRoutes);
app.use("/api/chat", chatRoutes);

app.get("/", (req, res) => {
    res.send("Backend is Running 🚀");
});

export default app;


