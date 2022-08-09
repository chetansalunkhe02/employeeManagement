import jwt from "jsonwebtoken"
import { sendErrorResponse } from "../helper/sendResponse"
const secretRefreshToken = process.env.JWT_REFRESH_SECRET
import redisClient from "../../redisConnect"

const verifyRefreshToken = (req, res) => {
  try {
    let refreshToken = req.refreshToken
    if (refreshToken) {
      const verifiedRefreshToken = jwt.verify(req.refreshToken, secretRefreshToken);
      req.user = verifiedRefreshToken

      // verify token is in store or not
      redisClient.get((verifiedRefreshToken.id).toString(), (error, data) => {
        if (error) {
          throw error
        }
        // if response is null
        if (data === null) {
          return sendErrorResponse(res, 401, "token isn't exists");
        }
        // check refresh token exists in redis store
        if (JSON.parse(data).refreshToken !== refreshToken) {
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