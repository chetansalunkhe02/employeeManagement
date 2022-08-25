import jwt from "jsonwebtoken"
import { sendErrorResponse } from "../helper/sendResponse"
const secretRefreshToken = process.env.JWT_REFRESH_SECRET
import redisClient from "../../redisConnect"

const verifyRefreshToken = (req, res, next) => {
  try {
    let refreshToken = req.body.refreshToken
    if (refreshToken) {
      const verifiedRefreshToken = jwt.verify(refreshToken, secretRefreshToken);
      req.user = verifiedRefreshToken.user

      // verify token is in store or not
      redisClient.get((verifiedRefreshToken.user.id).toString(), (error, data) => {
        if (error) {
          throw error
        }

        // if response is null
        if (data === null) {
          return sendErrorResponse(res, 401, "token isn't exists");
        }
        // check refresh token exists in redis store
        if (JSON.parse(data).token != refreshToken) {
          return sendErrorResponse(res, 401, "token isn't in store");
        }
        next()
      })
    } else {
      return sendErrorResponse(res, 401, "invalid request");
    }
  } catch (error) {
    return sendErrorResponse(res, 401, error.message);
  }
}

export { verifyRefreshToken }