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
  }

  res
    .status(status)
    .json({ errObj })
}