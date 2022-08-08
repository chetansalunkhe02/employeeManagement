import AuthController from '../controllers/AuthController'
import express from "express"

var router = express.Router();

router.post('/register', AuthController.signUp)
router.post('/login', AuthController.signIn)

export default router