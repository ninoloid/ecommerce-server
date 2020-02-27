if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "testing") {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const routes = require('./routes')
const errorHandler = require('./middlewares/errorHandler')
const cors = require('cors')

// CRON JOB
const CronJob = require('cron').CronJob;
const moment = require('moment');
const { Cart } = require('./models')
const { Op } = require('sequelize')
moment().format()

const job = new CronJob('0 */15 * * * *', function () {
  Cart.destroy({ where: { 
    createdAt: {
      [Op.lte] : moment().subtract(1, 'hours').toDate()
    },
    checkout: false
  } })
    .then(() => {
      console.log('Cart deleted')
    })
    .catch(() => {
      console.log('Failed to delete cart')
    })
  }, null, true, 'Asia/Jakarta');
job.start();
// END OF CRON JOB

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(routes)
app.use(errorHandler)

module.exports = app