const { Cart, User, Product } = require('../models')

module.exports = {
  addToCart(req, res, next) {
    const { ProductId, checkout } = req.body
    const UserId = req.currentUserId 
    
    Cart.findOrCreate({
      where: {
        UserId,
        ProductId,
        checkout
      },
        UserId,
        ProductId,
        checkout
    })
      .then(product => {
        if (product[0].id) {
          res
          .status(201)
          .json({ msg: "Product added to cart", product })
        } else {
          Product.findOne({ where: { id: ProductId } })
          .then(item => {
            const quantity = item.stock
            const newQty = product[0].quantity + 1
            if (quantity >= newQty) {
              Cart.update({
                quantity: newQty
              }, { where: { ProductId, UserId, checkout: false } })
              .then(() => {
                res
                .status(201)
                .json({ msg: "Quantity updated" })
              })
              .catch(next)
            } else {
              next({ name: "outofstock" })
            }
          })
          .catch(next)
        }
      })
      .catch(next)
  },

  getCart(req, res, next) {
    const id = req.currentUserId
    User.findOne({
      where: { id },
      attributes: ['id', 'username'],
      include: Product
    })
      .then(cart => {
        res
          .status(200)
          .json(cart.Products)
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
  },

  checkedOut(req, res, next) {
    const { id } = req.params
    const { checkout } = req.body
    Cart.update({
      checkout
    }, { where: { id } })
  }
}