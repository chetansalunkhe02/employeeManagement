import jwt from "jsonwebtoken"
import redisClient from "../../redisConnect"

const secretAccessToken = process.env.JWT_ACCESS_SECRET
const timeAccessToken = process.env.JWT_ACCESS_TIME

const secretRefreshToken = process.env.JWT_REFRESH_SECRET
const timeRefreshToken = process.env.JWT_REFRESH_TIME

const verifyToken = (token) => {
  try {
    const verified = jwt.verify(token, secretAccessToken);
    // varify blacklisted access token.
    // redisClient.get('BL_' + verified.id.toString(), (err, data) => {
    //   if (err) throw err;
    //   if (data === token) return res.status(401).json({ status: false, message: "blacklisted token." });
    //   next();
    // })
    return {
      status: true,
      data: verified
    }
  } catch (error) {
    return {
      status: false,
      message: error.message
    }
  }
}

const generateAccessToken = (user) => {
  return jwt.sign({ user }, secretAccessToken, { expiresIn: timeAccessToken });
}

const generateRefreshToken = (user) => {
  console.log("user", user)
  // save refresh token in redis store
  let refreshToken = jwt.sign({ user }, secretRefreshToken, { expiresIn: timeRefreshToken });
  let userId = user.id
  redisClient.get((userId).toString(), (err, data) => {
    if (err) {
      console.log("generateRefreshToken err", err);
    } else {
      redisClient.set(userId.toString(), JSON.stringify({ token: refreshToken }));
    }
  })
  return refreshToken
}

export {
  verifyToken,
  generateAccessToken,
  generateRefreshToken
}