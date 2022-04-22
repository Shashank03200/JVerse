const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  notificationType: {
    type: String,
    enum: ["NEW_FOLLOWER", "NEW_LIKE", "NEW_COMMENT"],
    required: true,
  },
  notificationText: {
    default: "",
    type: String,
    required: true,
  },
});

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
