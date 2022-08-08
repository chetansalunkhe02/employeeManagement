// import { Op } from 'sequelize'
import model from '../models'
import { sendSuccessResponse, sendErrorResponse } from '../helper/sendResponse';
const { User } = model;

export default {
  async list(req, res) {
    try {
      let users = await User.findAll({ where: { status: "active", userType: "employee" } })
      if (users.length) {
        return sendSuccessResponse(res, 200, users, 'Users fetched successfully.')
      } else {
        return sendSuccessResponse(res, 200, users, 'no users found.')
      }
    } catch (error) {
      console.log(error)
      return sendErrorResponse(res, 500, 'Could not perform operation at this time, kindly try again later.')
    }
  }
}