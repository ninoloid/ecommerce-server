const { User } = require('../models')

module.exports = {
  isActivatedAdmin (req, res, next){
    const id = req.currentUserId
    User.findOne({ where: { id } })
      .then(user => {
        const isAdmin = user.isAdmin
        const isActivated = user.isActivated
        isAdmin ? isActivated ? next()
          : next({ type: 'not activated' })
          : next({ type: 'not authorized' })
      })
      .catch(next)
  },
  
  isSuperAdmin (req, res, next) {
    const id = req.currentUserId
    User.findOne({ where: { id } })
      .then(user => {
        const isActivated = user.isActivated
        isActivated ? next() : next({ type: 'not activated' })
      })
      .catch(next)
  }
}

// module.exports = (req, res, next) => {
//   const id = req.currentUserId
//   User.findOne({ where: { id } })
//     .then(user => {
//       const isAdmin = user.isAdmin === true
//       const isActivated = user.isActivated === true
//       isAdmin ? isActivated ? next()
//         : next({ type: 'not activated' })
//         : next({ type: 'not authorized' })
//     })
//     .catch(next)
// }