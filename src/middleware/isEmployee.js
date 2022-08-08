import { sendErrorResponse } from "../helper/sendResponse"
import { verifyToken } from "../helper/tokenHelper"

export default async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  let tokenResponse = await verifyToken(token)
  if (tokenResponse.status) {
    req.user = tokenResponse.data.user;
    if (req.user.userType === 'employee') {
      next()
    } else {
      return sendErrorResponse(res, 401, "Unauthorized");
    }
  } else {
    return sendErrorResponse(res, 401, tokenResponse?.message);
  }
}