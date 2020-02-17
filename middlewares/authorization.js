const { User } = require('../models')

module.exports = (req, res, next) => {
  const id = req.currentUserId
  User.findOne({ where: { id } })
    .then(user => {
      const isAdmin = user.isAdmin === true
      isAdmin ? next() : next({ type: 'not authorized' })
    })
    .catch(next)
}