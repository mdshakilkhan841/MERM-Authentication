import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { connectDb } from "./database/connectDB.js";
import authRoute from "./routes/auth.route.js";
import cookieParser from "cookie-parser";

dotenv.config();
const __dirname = path.resolve();
const PORT = process.env.PORT || 5000;

const app = express();

// app.use(cors({
//     origin: "http://localhost:5173", credentials: true
// }));

app.use(express.json()); // Middleware to parse JSON data
app.use(cookieParser()); // Middleware to parse cookies

app.use("/api/auth", authRoute);

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}

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