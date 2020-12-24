const sequelize = require('../../orm/index.js')
const account = require('../../orm/models/account.js')
const Account = sequelize.define('Account', account)

/**
 * 用户登录
 * @param {String} username 用户名
 * @param {String} password 密码
 * @returns {Object} userInfo 用户信息
 */
const login = async (username, password) => {
  const account = await Account.findOne({
    where: {username: username}
  })
  return account.dataValues.password === password ? account : null
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

module.exports = {
  login,
  getUserList,
  deleteUserByName
}
