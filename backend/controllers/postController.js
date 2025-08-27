const Post = require("../models/Post");


const createPost = async (req, res, next) => {
  try {
    const { content } = req.body;
    if (!content || !content.trim()) {
      const error = new Error("Post content cannot be empty.");
      error.statusCode = 400;
      throw error;
    }

    const post = new Post({ content, author: req.user.userId });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
};


const getFeed = async (req, res, next) => {
  try {
    const posts = await Post.find()
      .populate("author", "name")
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    next(err);
  }
};


const updatePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      const error = new Error("Post not found.");
      error.statusCode = 404;
      throw error;
    }

    if (String(post.author) !== String(req.user.userId)) {
      const error = new Error("Not authorized to edit this post.");
      error.statusCode = 403;
      throw error;
    }

    if (!req.body.content || !req.body.content.trim()) {
      const error = new Error("Content cannot be empty.");
      error.statusCode = 400;
      throw error;
    }

    post.content = req.body.content;
    await post.save();
    res.json(post);
  } catch (err) {
    next(err);
  }
};


const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      const error = new Error("Post not found.");
      error.statusCode = 404;
      throw error;
    }

    if (String(post.author) !== String(req.user.userId)) {
      const error = new Error("Not authorized to delete this post.");
      error.statusCode = 403;
      throw error;
    }

    await post.deleteOne();
    res.json({ message: "Post deleted successfully." });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createPost,
  getFeed,
  updatePost,
  deletePost,
};
