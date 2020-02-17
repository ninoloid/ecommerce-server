const router = require('express').Router()
const { productController } = require('../controllers')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.post('/product', authentication, authorization, productController.addProduct)
router.get('/product', productController.getAllProduct)
router.get('/product/:id', productController.getOneProduct)
router.put('/product/:id', authentication, authorization, productController.updateProduct)
router.delete('/product/:id', authentication, authorization, productController.deleteProduct)

module.exports = router