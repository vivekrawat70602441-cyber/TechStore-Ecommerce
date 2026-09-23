import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const testAtlasConnection = async () => {
    try {
        console.log("🔄 Connectiing to MongoDB Atlas...");
        await mongoose.connect(process.env.ATLAS_URL);
        console.log("✅ MongoDB Atlas Connected Successfully");
        await mongoose.connection.close();
        console.log("🔒 Connection Closed");
    } catch (error) {
        console.error(" Atlas Connection Error:", error);
    }
};

testAtlasConnection();