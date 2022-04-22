const createError = require("http-errors");
const Post = require("../models/Post");
const Comment = require("../models/Comment");

const getAllComments = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId).populate({
      path: "comments",
      populate: {
        path: "userId",
        select: "_id username profileImage",
      },
    });

    if (post) {
      const comments = post.comments;
      // return res.status(200).json(comments);
      const finalComments = comments.map((comment) => {
        return {
          ...comment._doc,
          owner: comment.userId._id.toString() === req.userId.toString(),
        };
      });

      res.status(200).json(finalComments);
    } else {
      throw createError.NotFound();
    }
  } catch (error) {
    next(error);
  }
};

const getLatestComments = async (req, res, next) => {
  try {
    let post = await Post.findById(req.params.postId, {
      comments: { $slice: -2 },
    }).populate({
      path: "comments",
      populate: {
        path: "userId",
        select: "_id username profileImage",
      },
    });

    if (post.comments.length === 0) {
      post = await Post.findById(req.params.postId)
        .populate("userId")
        .populate("comments");
    }

    if (post) {
      const defaultComments = post.comments;
      let comments = [];

      comments = defaultComments.map((comment) => {
        return {
          ...comment._doc,
          owner: comment.userId._id.toString() === req.userId.toString(),
        };
      });

      res.status(200).json(comments);
    } else {
      res.status(404).json({ error: true, message: "Post details not found" });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const addNewComment = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findById(req.params.postId);

    const newComment = await new Comment({
      userId: req.userId,
      postId,
      commentText: req.body.commentText,
    });
    const savedComment = await newComment.save();

    if (post) {
      await Post.updateOne(
        { _id: postId },
        { $push: { comments: savedComment._id } }
      );
      const completeComment = await Comment.findById(savedComment.id)
        .populate("userId")
        .lean();
      completeComment["owner"] = true;
      res.status(200).json(completeComment);
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const deleteComment = async (req, res, next) => {
  try {
    const userId = req.userId;

    const postId = req.body.postId;
    const commentId = req.params.commentId;

    const post = await Post.findById(postId);

    if (post) {
      const comment = await Comment.findById(commentId);
      if (comment.userId.toString() === userId.toString()) {
        await Comment.deleteOne({ _id: commentId });
        await Post.updateOne(
          { _id: postId },
          { $pull: { comments: commentId } }
        );
        res.status(200).json({ success: true, msg: "Comment deleted" });
      } else {
        throw createError.Forbidden();
      }
    } else {
      throw createError.BadRequest();
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  getAllComments,
  getLatestComments,
  addNewComment,
  deleteComment,
};
