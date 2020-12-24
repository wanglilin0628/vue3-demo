const express = require('express')
const userMethod = require('../../controller/user')
const router = express.Router()

/**
 * 用户登录请求
 */
router.post('/login', async (req, res) => {
  const userInfo = await userMethod.getUser(req.body.username)
  if (userInfo !== null && req.body.password === userInfo.dataValues.password) {
    res.status(200).send(userInfo.dataValues)
  } else {
    res.sendStatus(401)
  }
})

/**
 * 获取用户列表请求
 */
router.post('/getUserList', async (req, res) => {
  const userList = await userMethod.getUserList()
  userList ? res.status(200).send(userList) : res.sendStatus(404)
})

/**
 * 删除用户请求
 */
router.post('/deleteUser', async (req, res) => {
  const result = await userMethod.deleteUserByName(req.body.username)
  result ? res.sendStatus(200) : res.sendStatus(404)
})

module.exports = router
