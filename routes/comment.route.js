const router = require("express").Router();

const commentController = require("../controllers/comment.controller");

const { verifyAccessToken } = require("../helpers/jwt_auth");

router.get("/:postId/all", verifyAccessToken, commentController.getAllComments);

router.post("/:postId/new", verifyAccessToken, commentController.addNewComment);

router.get(
  "/:postId/latest",
  verifyAccessToken,
  commentController.getLatestComments
);

router.delete(
  "/:commentId",
  verifyAccessToken,
  commentController.deleteComment
);

module.exports = router;
