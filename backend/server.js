import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./database/connectDB.js";
import authRoute from "./routes/auth.route.js";
import cookieParser from "cookie-parser";

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json()); // Middleware to parse JSON data
app.use(cookieParser()); // Middleware to parse cookies

app.use("/api/auth", authRoute);

// Connect to the database first, then start the server
connectDb()
    .then(() => {
        app.listen(PORT, () => {
            console.log("🚀 ~ app.listen ~ Server is running PORT:", PORT);
        })
    })
    .catch((error) => {
        console.log("🚀 ~ Failed to connect to the database:", error.message);
        process.exit(1); // Exit the process if the DB connection fails
    });