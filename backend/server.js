const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/posts");
const profileRoutes = require("./routes/profile");

const app = express();

// ✅ Use your FRONTEND_URL from env
app.use(
  cors({
    origin: "https://linkedin-clone-aditya.vercel.app",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/profile", profileRoutes);

// Error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({ msg: err.message });
});

// ✅ MongoDB Connection (Lazy & Reusable)
let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;
  try {
    const db = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = db.connections[0].readyState === 1;
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error", err);
  }
};


module.exports = async (req, res) => {
  await connectDB();
  return app(req, res);
};
