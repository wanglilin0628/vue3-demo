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
  userList ? res.status(200).send(userList) : res.sendStatus(500)
})

/**
 * 删除用户请求
 */
router.post('/delete', async (req, res) => {
  const result = await userMethod.deleteUserByName(req.body.username)
  result ? res.sendStatus(200) : res.sendStatus(500)
})

/**
 * 新增用户请求
 */
router.post('/add', async (req, res) => {
  const result = await userMethod.addUser(req.body.userInfo)
  if (result !== null && result.error) {
    res.status(202).send(result)
  } else if (result !== null) {
    res.status(200).send(result)
  } else {
    res.sendStatus(500)
  }
})

/**
 * 更新用户请求
 */
router.post('/update', async (req, res) => {
  const result = await userMethod.updateUser(req.body.userInfo)
  if (result !== null && result.status === 200) {
    res.status(200).send(result)
  } else if (result !== null && result.status === 203) {
    res.sendStatus(203)
  } else {
    res.sendStatus(500)
  }
})

module.exports = router
