require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");
const connectDB = require("./helpers/init_mongodb");

var morgan = require("morgan");
require("./helpers/init_mongodb");
require("./helpers/init_redis");

const app = express();
app.use(cors({
    credentials:true,            //access-control-allow-credentials:true
}));
app.use(express.json());

app.use(morgan("dev"));

const authRouter = require("./routes/auth.route");
const userRouter = require("./routes/users.route");
const postRouter = require("./routes/posts.route");
const commentRouter = require("./routes/comment.route");

const PORT = process.env.PORT || 5000;

app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/users", userRouter);
app.use("/api/comments", commentRouter);

// Error Response Middleware
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({
    success: false,
    msg: err.message,
  });
});

// Code to be used in production / deployment
// Server static assets if in production
// if (process.env.NODE_ENV === "production") {
// Set a static folder
app.use(express.static(path.join(__dirname, "client", "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});
// }
connectDB
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log("Server started on Port ", PORT);
    });
  })
  .catch((err) => console.log(err));
