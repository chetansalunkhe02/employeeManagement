import AuthController from '../controllers/AuthController'
import express from "express"
import { verifyRefreshToken } from "../middleware/verifyRefreshToken"
import { verifyAccessToken } from "../middleware/verifyAccessToken"
var router = express.Router();

router.post('/register', AuthController.signUp)
router.post('/login', AuthController.signIn)
router.get('/logout', verifyAccessToken, AuthController.logout)
router.post('/getToken', verifyRefreshToken, AuthController.getToken)

export default router