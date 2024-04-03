import { Express } from "express";

const express = require("express");

const app = express();

app.listen(5000, () => {
    connectToMongoDB();
    console.log(`Server is running on port 5000`);
  });

app.get("/", (req, res) => {
    res.send("hello");
});
