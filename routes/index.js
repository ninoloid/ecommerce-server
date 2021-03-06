const router = require('express').Router()
const userRouter = require('./userRouter')
const productRouter = require('./productRouter')
const cartRouter = require('./cartRouter')

router.use('/', userRouter)
router.use('/product', productRouter)
router.use('/cart', cartRouter)

module.exports = router