const sequelize = require('../../orm/index.js')
const account = require('../../orm/models/account.js')
const Account = sequelize.define('Account', account)
const moment = require('moment-timezone')
moment.tz.setDefault('Asia/Shanghai')

/**
 * 根据用户名查询
 * @param {String} username 用户名
 * @returns {Object} userInfo 用户信息
 */
const getUser = async (username) => {
  const user = await Account.findOne({
    where: {username: username}
  })
  return user || null
}

/**
 * 获取所有用户信息
 */
const getUserList = () => {
  const userList = Account.findAll({
    order: ['username']
  })
  if (userList) {
    return userList
  }
}

/**
 * 根据用户名删除用户数据
 * @param {String} username 用户名
 */
const deleteUserByName = async (username) => {
  const result = await Account.destroy({
    where: {
      username: username
    }
  })
  return result
}

/**
 * 新增用户
 */
const addUser = async (payload) => {
  let result = null
  try {
    result = await Account.create({
      username: payload.username,
      name: payload.name,
      password: payload.password,
      department: payload.department,
      group: payload.group,
      created_time: moment().format('YYYY-MM-DD HH:mm:ss').toString(),
      update_time: null
    })
  } catch (e) {
    console.log('插入数据时发生错误: ', e)
    if (e.parent.code === 'ER_DUP_ENTRY') { // 异常处理
      result = { error: e.fields }
    }
  }
  return result
}

module.exports = {
  getUser,
  getUserList,
  deleteUserByName,
  addUser
}
