import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";
import products from "./data/products.js";

dotenv.config();

const connectionDB = async () => {

    try {
        await mongoose.connect(process.env.ATLAS_URL);

        console.log("✅ MongoDB Connected");

    } catch (error) {

        console.log(error);

        process.exit(1);
    }
};

const importData = async () => {

    try {

        // Connect MongoDB
        await connectionDB();

        // Delete Old Products
        await Product.deleteMany();

        console.log("🗑 Old Products Deleted");

        // Insert New Products
        await Product.insertMany(products);

        console.log("✅ Products Imported Successfully");

        // Close Connection
        await mongoose.connection.close();

        console.log("🔒 MongoDB Connection Closed");
        process.exit();

    } catch (error) {

        console.log(error);

        process.exit(1);
    }
};

importData();