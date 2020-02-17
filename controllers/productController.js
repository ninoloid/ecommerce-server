const { Product } = require('../models')

module.exports = {
  addProduct(req, res, next) {
    const { name, description, category, price, stock, imageUrl } = req.body
    Product.create({
      name,
      description,
      category,
      price,
      stock,
      imageUrl
    })
      .then(product => {
        res
          .status(201)
          .json({ msg: "Product added to the database", product })
      })
      .catch(next)
  },

  getAllProduct(req, res, next) {
    Product.findAll()
      .then(products => {
        res
          .status(200)
          .json({ products })
      })
      .catch(next)
  },

  getOneProduct(req, res, next) {
    const { id } = req.params
    Product.findOne({ where: { id } })
      .then(product => {
        res
          .status(200)
          .json({ product })
      })
      .catch(next)
  }
}