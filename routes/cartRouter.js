const router = require('express').Router()
const { cartController } = require('../controllers')
const authentication = require('../middlewares/authentication')

router.use(authentication)
router.post('/', cartController.addToCart)
router.get('/', cartController.getCart)
router.delete('/:id', cartController.deleteFromCart)
router.patch('/checkout/:id', cartController.checkedOut)

module.exports = router