const router = require('express').Router()
const { productController } = require('../controllers')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.post('/product', authentication, authorization, productController.addProduct)

module.exports = router