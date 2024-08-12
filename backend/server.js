import express from "express";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json()); // Middleware to parse JSON data

app.listen(PORT, () => {
    console.log("Server is running  port: ", PORT);
})