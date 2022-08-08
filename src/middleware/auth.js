import { sendErrorResponse } from "../helper/sendResponse"
import { verifyToken } from "../helper/tokenHelper"

export default async (req, res, next) => {
  // check token exists
  if (!req.headers.authorization) {
    return sendErrorResponse(res, 401, 'Authentication required');
  }
  // check token validity
  if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
    const token = req.headers.authorization.split(" ")[1];
    let tokenResponse = await verifyToken(token)
    if (tokenResponse.status) {
      req.user = tokenResponse.data.user
      next()
    } else {
      return sendErrorResponse(res, 401, tokenResponse?.message);
    }
  } else {
    return sendErrorResponse(res, 401, 'Invalid token');
  }
}