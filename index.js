const express = require('express')
const parser = require('body-parser')
const user = require('./src/express-routes/user')

const app = express()
app.use(parser.json())

app.use('/api/user', user)

app.listen(8080, (req, res) => {
  console.log('Server running at http://127.0.0.1:8080')
})
