import { Op, sequelize } from 'sequelize'
import model from '../models'
import { sendSuccessResponse, sendErrorResponse } from '../helper/sendResponse';
import department from '../models/department';
const { Department } = model;

export default {
  async list(req, res) {
    try {
      let departments = await Department.findAll()
      if (departments.length) {
        return sendSuccessResponse(res, 201, departments, 'Departments fetched successfully.')
      } else {
        return sendErrorResponse(res, 422, 'no deparments found.')
      }
    } catch (error) {
      console.log(error)
      return sendErrorResponse(res, 500, 'Could not perform operation at this time, kindly try again later.')
    }
  },
  async create(req, res) {
    try {
      let { name, description, email, phone } = req.body
      let department = await Department.create({ name, description, email, phone })
      return sendSuccessResponse(res, 201, department, 'Department added successfully.')
    } catch (error) {
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
  async update(req, res) {
    try {
      let { id, name, description } = req.body
      let department = await Department.findOne({ where: { id } })
      if (department) {
        let updatedDepartment = await department.update({ name, description })
        return sendSuccessResponse(res, 201, updatedDepartment, 'Department updated successfully.')
      } else {
        return sendErrorResponse(res, 422, 'department not found')
      }
    } catch (error) {
      console.log(error)
      return sendErrorResponse(res, 500, 'Could not perform operation at this time, kindly try again later.')
    }
  }
}