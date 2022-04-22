const User = require("../models/User");
const client = require("../helpers/init_redis");
const createError = require("http-errors");
const { registerSchema, loginSchema } = require("../helpers/validation_schema");
const {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} = require("../helpers/jwt_auth");

const registerUser = async (req, res, next) => {
  try {
    const result = await registerSchema.validateAsync(req.body);
    const foundUser = await User.findOne({ email: result.email });

    if (foundUser) {
      throw createError.Conflict(`Email is already in use.`);
    }

    const usernameDuplicate = await User.findOne({ username: result.username });

    if (usernameDuplicate) {
      throw createError.Conflict(
        `The username ${result.username} is  already taken`
      );
    }
    const newUser = await new User({ ...result, firstSignIn: true });

    const savedUser = await newUser.save();

    // Generate access token and refresh token

    const accessToken = await signAccessToken(savedUser.id);
    const refreshToken = await signRefreshToken(savedUser.id);
    res.status(200).json({
      success: true,
      msg: "Account created.",
      data: { accessToken, refreshToken },
    });
  } catch (err) {
    next(err);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const result = await loginSchema.validateAsync(req.body);

    const user = await User.findOne({ email: result.email }).select(
      "+password"
    );
    if (!user) {
      throw createError.NotFound("Your account is not registered");
    }

    const isMatch = await user.isValidPassword(result.password);

    if (!isMatch) throw createError.Unauthorized("Invalid email or password");

    const accessToken = await signAccessToken(user.id);
    const refreshToken = await signRefreshToken(user.id);
    res.status(200).json({
      success: true,
      msg: "Logged in successfuly",
      data: { accessToken, refreshToken },
    });
  } catch (err) {
    next(err);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    console.log(req.body);
    const { refreshToken } = req.body;
    if (!refreshToken) throw createError.BadRequest();
    const userId = await verifyRefreshToken(refreshToken);
    const accessToken = await signAccessToken(userId);
    const newRefreshToken = await signRefreshToken(userId);

    res.status(200).json({
      success: true,
      msg: "Token refreshed",
      data: { accessToken, refreshToken: newRefreshToken },
    });
  } catch (err) {
    next(err);
  }
};

const logoutUser = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) throw createError.BadRequest();

    const userId = await verifyRefreshToken(refreshToken);

    client.del(userId, (err, val) => {
      if (err) {
        console.log(err.message);
        throw createError.InternalServerError();
      } else console.log(val);
    });
    res.status(204).json({
      success: true,
      msg: "Logged out",
    });
  } catch (error) {
    next(error);
  }
};

const getUserByToken = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);

    const { password, ...userData } = await user._doc;
    res.status(200).json({
      success: true,
      msg: "Done",
      data: userData,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  loginUser,
  registerUser,
  refreshToken,
  getUserByToken,
  logoutUser,
};
