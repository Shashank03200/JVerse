const createError = require("http-errors");
const User = require("../models/User");
const Post = require("../models/Post");
const cloudinary = require("../helpers/cloudinary_init");
const { dataUri } = require("../helpers/file_upload");

const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId);

    if (post.userId.toString() === req.userId.toString()) {
      const public_id = post.public_id;

      if (public_id !== "") {
        const result = await cloudinary.uploader.destroy(public_id, {
          resource_type: "image",
          type: "upload",
        });
      }

      await User.updateOne(
        { _id: req.userId },
        { $pull: { posts: req.params.postId } }
      );
      await Post.deleteOne({ _id: req.params.postId });

      res.status(200).json({
        success: true,
        msg: "Post deleted.",
      });
    } else {
      res.status(401).json({
        success: false,
        msg: "You can delete only your posts.",
      });
    }
  } catch (err) {
    next(err);
  }
};

const getTimelinePosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10);
    const count = parseInt(req.query.count, 10);

    const currentUser = await User.findById(req.userId);
    const userPosts = await Post.find({ userId: req.userId })
      .sort({
        createdAt: "desc",
      })
      .skip(count * (page - 1))
      .limit(count)
      .populate("userId");
    let friendPosts = [];
    friendPosts = await Promise.all(
      currentUser.following.map((friendId) => {
        return Post.find({ userId: friendId })
          .sort({ createdAt: "desc" })
          .skip(count * (page - 1))
          .limit(count)
          .populate("userId");
      })
    );

    const totalPosts = userPosts.concat(...friendPosts);

    const finalPosts = totalPosts.map((post) => {
      return {
        ...post._doc,
        postDeletePossible:
          post.userId._id.toString() === req.userId.toString(),
      };
    });
    res.status(200).json({
      success: true,
      msg: "Timeline Posts Fetched",
      data: finalPosts,
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const createNewPost = async (req, res, next) => {
  try {
    const userId = req.userId;

    if (req.file) {
      if (req.fileValidationError) {
        return res.type("json").status(400).json({
          success: false,
          msg: req.fileValidationError,
        });
      }
    }
    const desc = req.body.desc;
    const imageBase64Content = dataUri(req);

    const result = await cloudinary.uploader.upload(imageBase64Content, {
      folder: `social/posts/${userId}`,
    });

    const newPost = await new Post({
      userId,
      desc,
      public_id: result.public_id,
      postImage: result.url,
    });

    const uploadedPost = await newPost.save();
    await User.updateOne({ _id: userId }, { $push: { posts: newPost._id } });
    const foundPost = await Post.findById(uploadedPost.id).populate("userId");
    const completePost = {
      ...foundPost._doc,
      postDeletePossible: true,
    };
    return res
      .status(200)
      .json({ success: true, msg: "Post Created.", data: completePost });
  } catch (err) {
    console.log("Error::", err);
    next(err);
  }
};

const getAllPosts = async (req, res, next) => {
  try {
    const loggedInUserId = req.userId;
    const randomUsername = req.params.username;
    const randomUserData = await User.findOne({
      username: randomUsername.toString(),
    }).populate("posts");

    let owner = false;
    if (!loggedInUserId) {
      owner = false;
    } else {
      owner = loggedInUserId.toString() === randomUserData._id.toString();
    }

    return res.status(200).json({
      success: true,
      msg: "All posts fetched",
      data: { ...randomUserData._doc, owner: owner },
    });
  } catch (err) {
    console.log(err);
  }
};

const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    if (post) {
      if (!post.likes.includes(req.userId)) {
        await post.updateOne({ $push: { likes: req.userId } });
        await post.save();
        res
          .status(200)
          .json({ currentState: "liked", msg: "The post has been liked" });
      } else {
        await post.updateOne({ $pull: { likes: req.userId } });
        await post.save();
        res.status(200).json({
          currentState: "disliked",
          msg: "The post has been disliked",
        });
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const getPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId).populate("comments");
    if (!post) {
      throw createError.NotFound("The post was not found");
    }
    res.status(200).json({
      success: true,
      msg: "Post fetched",
      data: post,
    });
  } catch (err) {
    next(err);
  }
};

const getLikeStatus = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (post) {
      if (post.likes.includes(req.userId)) {
        return res.status(200).json({ likeState: true });
      } else {
        return res.status(200).json({ likeState: false });
      }
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const getLikes = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (post) {
      const likesArray = post.likes;

      return res
        .status(200)
        .json({ success: true, msg: "likes fetched", data: likesArray });
    }
    throw createError.NotFound();
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = {
  deletePost,
  getTimelinePosts,
  createNewPost,
  getAllPosts,
  likePost,
  getPost,
  getLikeStatus,
  getLikes,
};
