import { Op } from 'sequelize'
import model from '../models'
import { generateAccessToken, generateRefreshToken } from "../helper/tokenHelper"
import { sendErrorResponse, sendSuccessResponse } from '../helper/sendResponse';
import redisClient from '../../redisConnect';
const { User, Employee } = model;

export default {
  async signUp(req, res) {
    const { email, password, name, userName } = req.body;
    let userType = "employee"
    let status = "active"
    try {
      // const user = await User.findOne({ where: { [Op.or]: [{ userName }, { email }] } });
      let user = await User.create({
        name,
        email,
        password,
        userName,
        status,
        userType
      });

      // if userType is employee, make entry in employee table
      if (userType === 'employee') {
        await Employee.create({
          userId: user.id
        })
      }
      return sendSuccessResponse(res, 201, user, 'registered successfully')
    } catch (error) {
      console.log(error);
      let messages = {}
      let code = null
      if (error.name === "SequelizeValidationError" || error.name === "SequelizeUniqueConstraintError") {
        error.errors.forEach(e => {
          messages[e.path] = e.message
        });
        code = 403
        return sendErrorResponse(res, code, messages)
      } else {
        return sendErrorResponse(res, 500, 'Could not perform operation at this time, kindly try again later.')
      }
    }
  },
  async signIn(req, res) {
    try {
      const { userName, password } = req.body;
      let user = await User.findOne({ where: { userName: userName } })
      if (user) {
        // compare password
        user.comparePassword(password, async (error, isMatching) => {
          if (error || !isMatching) {
            return sendErrorResponse(res, 422, 'Wrong password')
          } else if (isMatching) {
            // generate jwt token
            let accessToken = generateAccessToken(user)
            let refreshToken = generateRefreshToken(user)
            return sendSuccessResponse(res, 201, {
              accessToken,
              refreshToken,
              data: user,
            }, 'User logged in successfully.')
          } else {
            return sendErrorResponse(res, 422, 'Wrong password')
          }
        })
      }
    } catch (error) {
      console.log(error)
      return sendErrorResponse(res, 500, 'Could not perform operation at this time, kindly try again later.')
    }
  },
  async getToken(req, res) {
    let user = req.user
    let accessToken = generateAccessToken(user)
    let refreshToken = generateRefreshToken(user)
    return sendSuccessResponse(res, 201, {
      accessToken,
      refreshToken
    })
  },
  async logout(req, res) {
    const userId = req.user.id;
    const accessToken = req.accessToken;
    // remove the refresh token
    await redisClient.del(userId.toString());
    // blacklist current access token
    await redisClient.set('BL_' + userId.toString(), accessToken);
    return sendSuccessResponse(res, 201, null, "successfully logged out")
  }
}