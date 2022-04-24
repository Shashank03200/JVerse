const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  fromUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  toUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  notificationType: {
    type: String,
    enum: ["NEW_FOLLOWER", "NEW_LIKE", "NEW_COMMENT"],
    required: true,
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: false,
  },
  notificationText: {
    default: "",
    type: String,
    required: true,
  },
});

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
