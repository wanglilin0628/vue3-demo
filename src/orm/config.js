module.exports = {
  database: 'ctp6demo',
  username: 'root',
  password: '1234',
  host: '127.0.0.1',
  port: '3306',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  timezone: '+08:00'
}
