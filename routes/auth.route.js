const router = require("express").Router();

const authController = require("../controllers/auth.controller");

const { verifyAccessToken } = require("../helpers/jwt_auth");

router.post("/register", authController.registerUser);

router.post("/login", authController.loginUser);

router.post("/refresh-token", authController.refreshToken);

router.post("/logout", authController.logoutUser);

router.get("/user", verifyAccessToken, authController.getUserByToken);

module.exports = router;
