import connectToMongoDB from "./db/connectToMongoDB.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import employeeRoutes from "./routes/employeeRoutes.js"
import cors from "cors";
import express from "express";

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

dotenv.config();

app.use('/api/employees', employeeRoutes);

app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
    res.send("hello hthhworld!!");
});
