const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");
const User = require("../models/User");
const auth = require("../middleware/auth");


router.post("/register", register);
router.post("/login", login);


router.get("/me", auth, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) throw new Error("User not found");
    res.json({ user });
  } catch (err) {
    next(new Error("Error fetching user " + err.message));
  }
});

module.exports = router;
