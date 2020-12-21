const express = require('express')
const parser = require('body-parser')
const login = require('./src/controller/login')

const app = express()
app.use(parser.json())

app.post('/api/login', async (req, res) => {
  const userInfo = await login(req.body.username, req.body.password)
  if (userInfo) {
    res.send(200, userInfo.dataValues)
  } else {
    res.sendStatus(401)
  }
})

app.listen(8080, (req, res) => {
  console.log('Server running at http://127.0.0.1:8080')
})
