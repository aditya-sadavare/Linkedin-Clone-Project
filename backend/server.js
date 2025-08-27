const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/posts");
const profileRoutes = require("./routes/profile");

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/profile", profileRoutes);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({ msg: err.message });
});

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
    app.listen(process.env.PORT, () =>
      console.log("Server running on port " + process.env.PORT)
    );
  } catch (err) {
    console.error("MongoDB connection error", err);
  }
};

startServer();
