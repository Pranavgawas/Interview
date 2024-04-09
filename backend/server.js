import connectToMongoDB from "./db/connectToMongoDB.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import employeeRoutes from "./routes/employeeRoutes.js";
import cors from "cors";
import express from "express";

const app = express();

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.json());

// Enable CORS
app.use(cors());

dotenv.config();

app.use("/api/employees", employeeRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("hello world!!");
});
