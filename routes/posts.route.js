const router = require("express").Router();

const {
  verifyAccessToken,
  tempVerifyAcessToken,
} = require("../helpers/jwt_auth");
const { upload } = require("../helpers/file_upload");
const postController = require("../controllers/post.controller");

router.delete("/:postId", verifyAccessToken, postController.deletePost);

router.get("/timeline", verifyAccessToken, postController.getTimelinePosts);

router.post(
  "/newpost",
  upload.single("postImage"),
  verifyAccessToken,
  postController.createNewPost
);

router.get(
  "/allposts/:username",
  tempVerifyAcessToken,
  postController.getAllPosts
);

router.post("/:postId/like", verifyAccessToken, postController.likePost);

router.get("/:postId", postController.getPost);

router.get(
  "/:postId/likestatus",
  verifyAccessToken,
  postController.getLikeStatus
);

router.get("/:postId/likes", verifyAccessToken, postController.getLikes);

module.exports = router;
