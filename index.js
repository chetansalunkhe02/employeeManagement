import express from 'express'
import authRoutes from './src/routes/auth'
import adminRoutes from './src/routes/admin'
import employeeRoutes from './src/routes/employee'
import auth from "./src/middleware/auth"
import isAdmin from "./src/middleware/isAdmin"
import isEmployee from "./src/middleware/isEmployee"
import "./src/config/config"

const port = 5000;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes
app.use('/', authRoutes)
app.use('/admin', auth, isAdmin, adminRoutes)
app.use('/employee', auth, isEmployee, employeeRoutes)

//The 404 Route (ALWAYS Keep this as the last route)
app.get('*', (req, res) => {
  res.status(404).send('404 Error - not found');
});


app.listen(port, () => {
  console.log('App is now running at port ', port)
})

// app.on('error', onError);
// app.on('listening', onListening);