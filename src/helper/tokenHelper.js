import jwt from "jsonwebtoken"
const secretToken = "nodeAuthToken"

const verifyToken = (token) => {
  try {
    const verified = jwt.verify(token, secretToken);
    return {
      status: true,
      data: verified
    }
  } catch (error) {
    return {
      status: false,
      message: error.message
    }
  }
}

// const decode = (token) => {
//   try {
//     const verified = jwt.decode(token, secretToken);
//     return {
//       status: true,
//       data: verified
//     }
//   } catch (error) {
//     return {
//       status: false,
//       message: error.message
//     }
//   }
// }

const generateToken = (user) => {
  return jwt.sign({ user }, secretToken, { expiresIn: '12h' });
}
export { verifyToken, generateToken }