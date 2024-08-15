import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./database/connectDB.js";
import router from "./routes/auth.route.js";
import cookieParser from "cookie-parser";

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json()); // Middleware to parse JSON data
app.use(cookieParser()); // Middleware to parse cookies

app.use("/api/auth", router);

app.listen(PORT, () => {
    connectDb();
    console.log("Server is running  port: ", PORT);
})