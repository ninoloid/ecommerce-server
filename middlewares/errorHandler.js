module.exports = (err, req, res, next) => {
  // console.log('error handler', err)
  let status = 500
  let errObj = {
    msg: "Internal Server Error"
  }

  if (err.name === "SequelizeValidationError") {
    status = 400
    errObj.msg = "Validation Error"
    errObj.errors = err.errors.map(error => error.message)
  } else if (err.msg === 'Invalid Username, Email, or Password') {
    status = 400
    errObj.msg = err.msg
  } else if (err.type === 'not login') {
    status = 403
    errObj.msg = "This page can only be accessed by registered users, please login first"
  } else if (err.type === 'not authorized') {
    status = 401
    errObj.msg = "Sorry, you're not authorized"
  } else if (err.type === 'not activated') {
    status = 401
    errObj.msg = "Sorry, your admin account isn't activated yet"
  } else if (err.msg === 'Product not found') {
    status = 404
    errObj.msg = err.msg
  } else if (err.msg === 'Admin account not found') {
    status = 404
    errObj.msg = err.msg
  }

  res
    .status(status)
    .json({ errObj })
}