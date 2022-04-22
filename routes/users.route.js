const router = require("express").Router();
const { upload } = require("../helpers/file_upload");
const userController = require("../controllers/user.controller");
const { verifyAccessToken } = require("../helpers/jwt_auth");

router.put(
  "/update",
  verifyAccessToken,
  upload.single("profileImage"),
  userController.updateUser
);

router.delete("/:id", verifyAccessToken, userController.deleteUser);

router.post("/:id/follow", verifyAccessToken, userController.followUser);

router.post("/:id/unfollow", verifyAccessToken, userController.unfollowUser);

router.put(
  "/:id/update-password",
  verifyAccessToken,
  userController.updatePassword
);

router.get(
  "/suggested-users",
  verifyAccessToken,
  userController.getSuggestedUsers
);

module.exports = router;
