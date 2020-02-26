const router = require('express').Router()
const { cartController, discountController } = require('../controllers')
const authentication = require('../middlewares/authentication')

router.use(authentication)
router.post('/', cartController.addToCart)
router.get('/', cartController.getCart)
router.post('/discount', discountController.getDiscount)
router.delete('/:id', cartController.deleteFromCart)
router.patch('/checkout', cartController.checkedOut)

module.exports = router