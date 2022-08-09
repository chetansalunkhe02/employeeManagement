import jwt from "jsonwebtoken"
import { sendErrorResponse } from "../helper/sendResponse"
const secretRefreshToken = process.env.JWT_REFRESH_SECRET
import redisClient from "../../redisConnect"

const verifyAccessToken = (req, res, next) => {
  try {
    const accessToken = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
    req.user = decoded.user;
    req.accessToken = accessToken;
    // verify blacklisted access token.
    redisClient.get('BL_' + (decoded.user.id).toString(), (err, data) => {
      console.log("err", err)
      console.log("data", data)
      if (err) {
        return sendErrorResponse(res, 401, err);
      }
      if (data === accessToken) {
        return sendErrorResponse(res, 401, "blacklisted token.");
      }
      next;
    })
  } catch (error) {
    return sendErrorResponse(res, 401, error);
  }
}

export { verifyAccessToken }