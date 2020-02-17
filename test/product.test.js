const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models')
const { queryInterface } = sequelize

describe('Product Routes', () => {
  let admin_access_token
  let user_access_token

  beforeAll((done) => {
    request(app)
      .post('/register')
      .send({
        username: 'adminadmin',
        email: 'admin@admin.com',
        password: 'adminadmin',
        isAdmin: true
      })
      .end((err, response) => {
        const { body } = response
        admin_access_token = body.token
        done()
      })

    request(app)
      .post('/register')
      .send({
        username: 'useruser',
        email: 'user@user.com',
        password: 'useruser',
        isAdmin: false
      })
      .end((err, response) => {
        const { body } = response
        user_access_token = body.token
        done()
      })
  })

  afterAll((done) => {
    queryInterface.bulkDelete('Products')
      .then(response => {
        done()
      }).catch(err => done(err))

    queryInterface.bulkDelete('Users')
      .then(response => {
        done()
      }).catch(err => done(err))
  })

  // PRODUCT ROUTES TEST
  describe('Add Product', () => {

    describe('Product added successfully', () => {
      test('Should return status 201, success message, and product data(name, description, category, price, stock, imageUrl)', (done) => {
        request(app)
          .post('/product')
          .send({
            name: 'produk 1',
            description: 'deskripsi produk 1',
            category: 'kategori produk 1',
            price: 100000,
            stock: 10,
            imageUrl: "https://radscanmedical.com/wp-content/uploads/2018/11/coming-soon.png"
          })
          .set('access_token', admin_access_token)
          .end((err, response) => {
            const { body, status } = response
            const { msg, product } = body
            expect(err).toBe(null);
            expect(msg).toBe('Product added to the database')
            expect(product).toHaveProperty('name')
            expect(product).toHaveProperty('description')
            expect(product).toHaveProperty('category')
            expect(product).toHaveProperty('price')
            expect(product).toHaveProperty('stock')
            expect(product).toHaveProperty('imageUrl')
            expect(status).toBe(201);
            done()
          })
      })
    })

    describe('Failed to add product', () => {
      test('On authentication failed, return status 403 and error message "Please login first"', (done) => {
        request(app)
          .post('/product')
          .send({
            name: 'produk 1',
            description: 'deskripsi produk 1',
            category: 'kategori produk 1',
            price: 100000,
            stock: 10,
            imageUrl: "https://radscanmedical.com/wp-content/uploads/2018/11/coming-soon.png"
          })
          .end((err, response) => {
            const { body, status } = response
            expect(err).toBe(null);
            expect(body).toHaveProperty('errObj',
              expect.objectContaining({
                msg: 'This page can only be accessed by registered users, please login first'
              })
            )
            expect(status).toBe(403);
            done()
          })
      })

      test('On authorization failed, return status 401 and error message "Sorry, you\'re not authorized"', (done) => {
        request(app)
          .post('/product')
          .send({
            name: 'produk 1',
            description: 'deskripsi produk 1',
            category: 'kategori produk 1',
            price: 100000,
            stock: 10,
            imageUrl: "https://radscanmedical.com/wp-content/uploads/2018/11/coming-soon.png"
          })
          .set('access_token', user_access_token)
          .end((err, response) => {
            const { body, status } = response
            expect(err).toBe(null);
            expect(body).toHaveProperty('errObj',
              expect.objectContaining({
                msg: 'Sorry, you\'re not authorized'
              })
            )
            expect(status).toBe(401);
            done()
          })
      })

      test('On null or empty product name, return status 400 and error message "Product name cannot be empty"', (done) => {
        request(app)
          .post('/product')
          .send({
            name: '',
            description: 'deskripsi produk 1',
            category: 'kategori produk 1',
            price: 100000,
            stock: 10,
            imageUrl: "https://radscanmedical.com/wp-content/uploads/2018/11/coming-soon.png"
          })
          .set('access_token', admin_access_token)
          .end((err, response) => {
            const { body, status } = response
            const { errObj } = body
            expect(err).toBe(null);
            expect(errObj).toHaveProperty('msg', 'Validation Error')
            expect(errObj).toHaveProperty('errors', expect.arrayContaining(['Product name cannot be empty']))
            expect(status).toBe(400);
            done()
          })
      })

      test('On null or empty product description, return status 400 and error message "Product description cannot be empty"', (done) => {
        request(app)
          .post('/product')
          .send({
            name: 'produk 1',
            description: '',
            category: 'kategori produk 1',
            price: 100000,
            stock: 10,
            imageUrl: "https://radscanmedical.com/wp-content/uploads/2018/11/coming-soon.png"
          })
          .set('access_token', admin_access_token)
          .end((err, response) => {
            const { body, status } = response
            const { errObj } = body
            expect(err).toBe(null);
            expect(errObj).toHaveProperty('msg', 'Validation Error')
            expect(errObj).toHaveProperty('errors', expect.arrayContaining(['Product description cannot be empty']))
            expect(status).toBe(400);
            done()
          })
      })

      test('On null or empty product category, return status 400 and error message "Product category cannot be empty"', (done) => {
        request(app)
          .post('/product')
          .send({
            name: 'produk 1',
            description: 'deskripsi produk 1',
            category: '',
            price: 100000,
            stock: 10,
            imageUrl: "https://radscanmedical.com/wp-content/uploads/2018/11/coming-soon.png"
          })
          .set('access_token', admin_access_token)
          .end((err, response) => {
            const { body, status } = response
            const { errObj } = body
            expect(err).toBe(null);
            expect(errObj).toHaveProperty('msg', 'Validation Error')
            expect(errObj).toHaveProperty('errors', expect.arrayContaining(['Product category cannot be empty']))
            expect(status).toBe(400);
            done()
          })
      })

      test('On null or empty product price, return status 400 and error message "Price cannot be empty"', (done) => {
        request(app)
          .post('/product')
          .send({
            name: 'produk 1',
            description: 'deskripsi produk 1',
            category: 'kategori produk 1',
            stock: 10,
            imageUrl: "https://radscanmedical.com/wp-content/uploads/2018/11/coming-soon.png"
          })
          .set('access_token', admin_access_token)
          .end((err, response) => {
            const { body, status } = response
            const { errObj } = body
            expect(err).toBe(null);
            expect(errObj).toHaveProperty('msg', 'Validation Error')
            expect(errObj).toHaveProperty('errors', expect.arrayContaining(['Product price cannot be empty']))
            expect(status).toBe(400);
            done()
          })
      })

      test('On null or empty product stock, return status 400 and error message "Stock cannot be empty"', (done) => {
        request(app)
          .post('/product')
          .send({
            name: 'produk 1',
            description: 'deskripsi produk 1',
            category: 'kategori produk 1',
            price: 100000,
            imageUrl: "https://radscanmedical.com/wp-content/uploads/2018/11/coming-soon.png"
          })
          .set('access_token', admin_access_token)
          .end((err, response) => {
            const { body, status } = response
            const { errObj } = body
            expect(err).toBe(null);
            expect(errObj).toHaveProperty('msg', 'Validation Error')
            expect(errObj).toHaveProperty('errors', expect.arrayContaining(['Product stock cannot be empty']))
            expect(status).toBe(400);
            done()
          })
      })

      test('On null or empty image url, return status 400 and error message "Image URL cannot be empty"', (done) => {
        request(app)
          .post('/product')
          .send({
            name: 'produk 1',
            description: 'deskripsi produk 1',
            category: 'kategori produk 1',
            price: 100000,
            stock: 10,
            imageUrl: ''
          })
          .set('access_token', admin_access_token)
          .end((err, response) => {
            const { body, status } = response
            const { errObj } = body
            expect(err).toBe(null);
            expect(errObj).toHaveProperty('msg', 'Validation Error')
            expect(errObj).toHaveProperty('errors', expect.arrayContaining(['Image URL cannot be empty']))
            expect(status).toBe(400);
            done()
          })
      })
    })

  })
  // END OF PRODUCT ROUTES TEST
})