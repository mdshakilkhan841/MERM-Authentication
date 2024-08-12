import mongoose from "mongoose";

export const connectDb = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI)
        console.log("🚀 ~ MongoDB ~ Connected:", connect.connection.host)
    } catch (error) {
        console.log("🚀 ~ connectDb ~ error:", error.message);
        process.exit(1); // 1 is failure, 0 status code is success
    }
}