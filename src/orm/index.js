const config = require('./config.js')
const Sequelize = require('sequelize')
const account = require('./models/account.js')

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  port: config.port,
  dialect: 'mysql',
  pool: config.pool,
  define: {
    timestamps: false,
    freezeTableName: true
  }
})

const Account = sequelize.define('Account', account)

module.exports = Account
