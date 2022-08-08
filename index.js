import express from 'express'
import authRoutes from './src/routes/auth'
import adminRoutes from './src/routes/admin'
import employeeRoutes from './src/routes/employee'
import auth from "./src/middleware/auth"
import isAdmin from "./src/middleware/isAdmin"
import isEmployee from "./src/middleware/isEmployee"
import "./src/config/config"

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes
app.use('/', authRoutes)
app.use('/admin', auth, isAdmin, adminRoutes)
app.use('/employee', auth, isEmployee, employeeRoutes)
// Create a catch-all route for testing the installation.
// app.get('*', (req, res) => res.status(200).send({
//   message: 'Hello World!',
// }));
const port = 5000;
app.listen(port, () => {
  console.log('App is now running at port ', port)
})