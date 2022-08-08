import { Op } from 'sequelize'
import model from '../models'
import { sendSuccessResponse, sendErrorResponse } from '../helper/sendResponse';
const { Employee, Department, User } = model;

export default {
  async update(req, res) {
    try {
      let { id, departmentId } = req.body
      // check department exists 
      let deparment = await Department.findOne({ where: { id: departmentId } })
      if (!deparment) {
        return sendErrorResponse(res, 201, 'Invalid department')
      }

      let employee = await Employee.findOne({ where: { id } })
      if (employee) {
        let employeeUpdated = await employee.update({ departmentId })
        return sendSuccessResponse(res, 201, employeeUpdated, 'Employee details updated successfully.')
      } else {
        return sendErrorResponse(res, 201, 'employee not found')
      }
    } catch (error) {
      console.log(error)
      return sendErrorResponse(res, 500, 'Could not perform operation at this time, kindly try again later.')
    }
  },
  async get(req, res) {
    try {
      let { id } = req.params
      let employee = await Employee.findOne({
        where: { id },
        include: [{
          model: User
        }, {
          model: Department
        }]
      })
      if (employee) {
        return sendSuccessResponse(res, 201, employee, 'Employee details fetched successfully.')
      } else {
        return sendErrorResponse(res, 201, 'employee not found')
      }
    } catch (error) {
      console.log(error)
      return sendErrorResponse(res, 500, 'Could not perform operation at this time, kindly try again later.')
    }
  },
  async department(req, res) {
    try {
      let { id: userId } = req.user
      let employee = await Employee.findOne({
        where: { userId },
        include: {
          model: Department,
          include: {
            model: Employee,
            include: {
              model: User,
              attributes: ['id', 'name', 'email']
            }
          }
        }
      })
      if (employee) {
        return sendSuccessResponse(res, 201, employee.Department?.Employees, 'Details fetched successfully.')
      } else {
        return sendErrorResponse(res, 201, 'employee not found')
      }
    } catch (error) {
      console.log(error)
      return sendErrorResponse(res, 500, 'Could not perform operation at this time, kindly try again later.')
    }
  }
}