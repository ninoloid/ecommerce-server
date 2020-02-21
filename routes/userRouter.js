const router = require('express').Router()
const { userController } = require('../controllers')
const authentication = require('../middlewares/authentication')
const { isSuperAdmin } = require('../middlewares/authorization')

router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/showAdmin', userController.showAdmin)
router.patch('/updateAdmin/:id', authentication, isSuperAdmin, userController.updateAdminStatus)
router.delete('/deleteAdmin/:id', authentication, isSuperAdmin, userController.deleteUser)

module.exports = router