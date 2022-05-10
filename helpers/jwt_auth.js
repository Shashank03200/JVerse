const createError = require("http-errors");
const JWT = require("jsonwebtoken");
const client = require("./init_redis");
const jwt_decode = require("jwt-decode");

module.exports = {
  signAccessToken: (userId) => {
    return new Promise((resolve, reject) => {
      const payload = {};
      const secret = process.env.ACCESS_TOKEN_SECRET;
      const options = {
        expiresIn: "1y",
        issuer: "instagram.com",
        audience: userId,
      };

      JWT.sign(payload, secret, options, (err, accessToken) => {
        if (err) {
          console.log(err);
          return reject(createError.InternalServerError(""));
        } else {
          resolve(accessToken);
        }
      });
    });
  },

  verifyAccessToken: (req, res, next) => {
    try {
      const accessString = req.headers["authorization"];

      if (!accessString) {
        throw createError.Unauthorized();
      }

      const bearerToken = accessString.split(" ");
      const accessToken = bearerToken[1];

      if (!accessToken) {
        throw createError.Unauthorized();
      }

      JWT.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET,

        function (err, result) {
          if (err) {
            throw createError.Unauthorized("Invalid access token");
          }

          req.userId = result.aud;
          next();
        }
      );
    } catch (err) {
      next(err);
    }
  },

  signRefreshToken: (userId) => {
    return new Promise((resolve, reject) => {
      const payload = {};
      const secret = process.env.REFRESH_TOKEN_SECRET;
      const options = {
        expiresIn: "1y",
        issuer: "instagram.com",
        audience: userId,
      };

      JWT.sign(payload, secret, options, (err, refreshToken) => {
        if (err) {
          console.log(err);
          reject(createError.InternalServerError());
        } else {
          client.set(
            userId,
            refreshToken,
            "EX",
            365 * 24 * 60 * 60,
            (err, reply) => {
              if (err) {
                console.log(err);
                reject(createError.InternalServerError());
                return;
              }

              resolve(refreshToken);
            }
          );
        }
      });
    });
  },

  verifyRefreshToken: (refreshToken) => {
    return new Promise((resolve, reject) => {
      JWT.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, payload) => {
          if (err) {
            return reject(createError.Unauthorized());
          }
          console.log(payload);
          const userId = payload.aud;
          console.log(userId);
          client.get(userId, (err, result) => {
            if (err) {
              console.log(err.message);
              reject(createError.InternalServerError());
              return;
            }

            if (refreshToken === result) return resolve(userId);
            else reject(createError.Unauthorized());
          });
          return resolve(userId);
        }
      );
    });
  },

  tempVerifyAcessToken: (req, res, next) => {
    try {
      const accessString = req.headers["authorization"];
      if (!accessString) {
        next();
      }

      const bearerToken = accessString.split(" ");
      if (!bearerToken) {
        next();
      }
      const accessToken = bearerToken[1];
      if (!accessToken) {
        next();
      }
      var decoded = jwt_decode(accessToken);
      if (decoded.exp < Date.now() / 1000) {
        throw createError.Unauthorized();
      }
      JWT.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET,

        function (err, result) {
          if (err) {
            next();
          }
          if (result) {
            console.log("result", result);
            req.userId = result.aud;
          }
          next();
        }
      );
    } catch (err) {
      next(err);
    }
  },
};
