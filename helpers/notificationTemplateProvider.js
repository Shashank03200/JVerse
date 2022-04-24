const { NOTIFICATIONS_TEMPLATES } = require("../constants");

const User = require("../models/User");
const Post = require("../models/Post");

const notificationTemplateProvider = async (notifType) => {
  const user = await User.findById(payload.userId);
  return user.name + NOTIFICATIONS_TEMPLATES[notifType];
};

module.exports = notificationTemplateProvider;
