import express from "express"
import EmployeeController from "../controllers/EmployeeController";
var router = express.Router();

// users routes
router.get('/department', EmployeeController.department)
router.get('/details/:id', EmployeeController.get)

export default router