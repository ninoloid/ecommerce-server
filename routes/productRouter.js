const router = require('express').Router()
const { productController } = require('../controllers')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.post('/', authentication, authorization, productController.addProduct)
router.get('/', productController.getAllProduct)
router.get('/:id', productController.getOneProduct)
router.put('/:id', authentication, authorization, productController.updateProduct)
router.delete('/:id', authentication, authorization, productController.deleteProduct)

module.exports = router