require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const profileRoutes = require("./routes/profileRoutes");
const foodRoutes = require("./routes/foodRoutes");
const analysisRoutes = require("./routes/analysisRoutes");
const authRoutes = require("./routes/authRoutes");
const historyRoutes = require("./routes/historyRoutes");
const scanRoutes = require("./routes/scanRoutes");
const ocrRoutes = require("./routes/ocrRoutes");
const ocrHistoryRoutes = require("./routes/ocrHistoryRoutes");

const app = express();

const PORT = 5001;

connectDB();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/foods", foodRoutes);
app.use("/api/analysis", analysisRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/scan", scanRoutes);
app.use("/api/ocr", ocrRoutes);
app.use("/api/ocr/history", ocrHistoryRoutes);


// Auth routes
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "AllerGuard AI Backend is running 🚀"
    });
});

app.get("/health", (req, res) => {
    res.json({
        status: "OK"
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});