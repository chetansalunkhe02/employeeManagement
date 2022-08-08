import AuthController from '../controllers/AuthController'
import express from "express"
var router = express.Router();
router.post('/register', AuthController.signUp)
router.post('/login', AuthController.signIn)
// export default (app) => {
//   app.post('/register', AuthController.signUp);

//   // Create a catch-all route for testing the installation.
//   // app.all('*', (req, res) => res.status(200).send({
//   //   message: 'Hello World!',
//   // }));
// };

export default router