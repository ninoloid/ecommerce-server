const { Cart, User, Product } = require('../models')

module.exports = {
  addToCart(req, res, next) {
    const { UserId, ProductId, quantity } = req.body
    Cart.create({
      UserId,
      ProductId,
      quantity
    })
      .then(product => {
        res
          .status(201)
          .json({ msg: "Product added to cart", product })
      })
      .catch(err => {
        next(err)
      })
  },

  getCart(req, res, next) {
    const { id } = req.params
    User.findOne({
      where: { id },
      attributes: ['id', 'username'],
      include: Product
    })
      .then(cart => {
        res
          .status(200)
          .json(cart)
      })
      .catch(err => {
        next(err)
      })
  },

  deleteFromCart(req, res, next) {
    const { id } = req.params
    Cart.destroy({ where: { id } })
      .then(() => {
        res
          .status(200)
          .json({ msg: "Product removed from cart successfully" })
      })
      .catch(err => {
        next(err)
      })
  }
}