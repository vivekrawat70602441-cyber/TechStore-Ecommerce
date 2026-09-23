import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.ATLAS_URL);
        console.log("✅ MongoDB Atlas Connected");
    } catch (error) {
        console.error("❌ MongoDB Connection Error", error.message);
        process.exit(1);
    }
};

export default connectDB;