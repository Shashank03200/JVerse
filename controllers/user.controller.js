const User = require("../models/User");
const createError = require("http-errors");
const Post = require("../models/Post");
const cloudinary = require("cloudinary").v2;
const { dataUri } = require("../helpers/file_upload");
const bcrypt = require("bcrypt");
const socketIO = global.socketIO;

const updateUser = async (req, res, next) => {
  try {
    const userId = req.userId;

    const foundUser = await User.findById(userId);
    let result = undefined;

    if (req.file) {
      const profilePublicId = foundUser.public_id;
    }
    const base64ImageContent = dataUri(req);
    result = await cloudinary.uploader.upload(base64ImageContent, {
      folder: `social/profiles/${userId}`,
    });

    const updatedUserDetails = await User.findOneAndUpdate(
      { _id: userId },
      {
        profileImage: result ? result.url : foundUser.profileImage,
        public_id: result ? result.public_id : foundUser.public_id,
        name: req.body.name ? req.body.name : foundUser.name,
        bio: req.body.bio ? req.body.bio : foundUser.bio,
      },
      { new: true }
    );

    // const updatedUserDetails = await User.findById(userId);
    res.status(200).json({
      success: true,
      msg: "Account updated",
      data: updatedUserDetails,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const checkUsernameExists = async (req, res, next) => {
  try {
    const { queryString } = req.query;

    const _foundUser = await User.find({ username: queryString });
    console.log(queryString);
    if (_foundUser.length > 0) {
      return res.status(200).json({
        success: true,
        userExists: true,
      });
    } else {
      return res.status(200).json({
        success: true,
        userExists: false,
      });
    }
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    if (req.userId == req.params.id || req.body.isAdmin) {
      // Finding the user using the userId
      const user = await User.findById(req.params.id).select("+password");
      let isMatching = await user.isValidPassword(req.body.password);

      // removing this user from the follower list of other users so that their follower is not a non exisiting user.
      if (isMatching) {
        const followingUserList = await user.following;
        const removeFromFollowerListPromises = followingUserList.map(
          (otherUser) => {
            return User.updateOne(
              { _id: otherUser._id },
              { $pull: { followers: req.userId } }
            );
          }
        );

        await Promise.all(removeFromFollowerListPromises);

        if (user.public_id !== "") {
          await cloudinary.uploader.destroy(user.public_id.toString(), {
            resource_type: "image",
            type: "upload",
            invalidate: true,
          });
        }
        // removing this user from the following list of other users so that they dont follow a non existing user
        const followersUserList = await user.followers;
        const removeFromFollowingListPromise = followersUserList.map(
          (otherUser) => {
            return User.updateOne(
              { _id: otherUser._id },
              { $pull: { following: req.userId } }
            );
          }
        );

        await Promise.all(removeFromFollowingListPromise);

        //Deleting all the posts
        const posts = user.posts;

        await Post.deleteMany({ _id: { $in: posts } });

        User.findByIdAndDelete(req.userId, (err, docs) => {
          if (err) {
            console.log(err);
            throw createError.NotFound();
          } else {
            res.status(200).json({
              success: true,
              msg: "Account Deleted Successfully",
            });
          }
        });
      } else {
        throw createError.BadRequest("Invalid Credentials");
      }
    } else {
      throw createError.Unauthorized("You can only delete your account");
    }
  } catch (err) {
    next(err);
  }
};

const followUser = async (req, res, next) => {
  try {
    if (req.userId !== req.params.id) {
      const userToFollow = await User.findById(req.params.id);
      const currentUser = await User.findById(req.userId);

      if (!userToFollow.followers.includes(req.userId)) {
        await userToFollow.updateOne({ $push: { followers: req.userId } });
        if (!currentUser.following.includes(req.params.id)) {
          await currentUser.updateOne({ $push: { following: req.params.id } });
        }

        res.status(200).json({
          success: true,
          msg: "Now following " + userToFollow.username,
        });
      } else {
        res.status(400).json("You already follow this user.");
      }
    } else {
      throw createError.BadRequest("Action not allowed");
    }
  } catch (err) {
    next(err);
  }
};

const unfollowUser = async (req, res, next) => {
  try {
    if (req.userId !== req.params.id) {
      const userToUnfollow = await User.findById(req.params.id);
      const currentUser = await User.findById(req.userId);

      if (userToUnfollow.followers.includes(req.userId)) {
        await currentUser.updateOne({ $pull: { following: req.params.id } });
        await userToUnfollow.updateOne({
          $pull: { followers: req.userId },
        });
        res.status(200).json({
          success: true,
          msg: "Unfollowed " + userToUnfollow.username,
        });
      } else {
        res.status(400).json("You dont follow this user.");
      }
    } else {
      res.status(400).json("You cannot unfollow yourself.");
    }
  } catch (err) {
    next(err);
  }
};

const getSuggestedUsers = async (req, res, next) => {
  try {
    const currentUser = await User.findById(req.userId);
    if (!currentUser) throw createError.NotFound();

    const currentUserFollowing = currentUser.following;
    const allUsers = await User.find({}).limit(10);
    let suggestedUsers = [];

    suggestedUsers = allUsers.filter(
      (user) =>
        user._id.toString() !== currentUser._id.toString() &&
        !currentUserFollowing.includes(user._id)
    );

    res.status(200).json({
      success: true,
      msg: "Suggetions found",
      data: suggestedUsers,
    });
  } catch (err) {
    next(err);
  }
};

const updatePassword = async (req, res, next) => {
  try {
    const currentPassword = req.body.currentPassword;
    const newPassword = req.body.newPassword;

    if (req.userId == req.params.id) {
      const _foundUser = await User.findById(req.userId).select("+password");

      const isValidUser = await _foundUser.isValidPassword(currentPassword);
      console.log({ isValidUser });
      if (!isValidUser) {
        throw createError.BadRequest("Invalid credentials");
      }

      _foundUser.password = newPassword;
      await _foundUser.save();

      res.status(200).json({
        success: true,
        msg: "Details updated",
      });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  updateUser,
  deleteUser,
  followUser,
  unfollowUser,
  getSuggestedUsers,
  updatePassword,
  checkUsernameExists,
};
