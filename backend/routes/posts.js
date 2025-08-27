const express = require("express");
const router = express.Router();
const { createPost, getFeed, updatePost, deletePost } = require("../controllers/postController");
const auth = require("../middleware/auth");

router.post("/", auth, createPost);
router.get("/", getFeed);
router.put("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);

module.exports = router;
