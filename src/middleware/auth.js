import { sendErrorResponse } from "../helper/sendResponse"
import { verifyToken } from "../helper/tokenHelper"
import jwt from "jsonwebtoken"
import redisClient from "../../redisConnect"

export default async (req, res, next) => {
  try {
    // check token exists
    if (!req.headers.authorization) {
      return sendErrorResponse(res, 401, 'Authentication required');
    }
    // check token validity
    if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
      const accessToken = req.headers.authorization.split(" ")[1];
      const verified = jwt.verify(accessToken, secretAccessToken);
      req.user = verified.user;
      req.accessToken = accessToken;
      // verify blacklisted access token.
      redisClient.get('BL_' + (verified.user.id).toString(), (err, data) => {
        if (err) {
          return sendErrorResponse(res, 401, err);
        }
        if (data === accessToken) {
          return sendErrorResponse(res, 401, "blacklisted token.");
        }
        next();
      })
    } else {
      return sendErrorResponse(res, 401, 'Your session is not valid');
    }
  } catch (error) {

  }
}