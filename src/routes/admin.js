import express from "express"
import UserController from '../controllers/UserController'
import DepartmentController from '../controllers/DepartmentController';
import EmployeeController from "../controllers/EmployeeController";
var router = express.Router();

// users routes
router.get('/users', UserController.list)

// deparment routes
router.get('/departments', DepartmentController.list)
router.post('/department', DepartmentController.create)
router.put('/department', DepartmentController.update)

// employee routes 
router.put("/employee", EmployeeController.update)


export default router