const sequelize = require('../../orm/index.js')
const account = require('../../orm/models/account.js')
const Account = sequelize.define('Account', account)

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

module.exports = {
  getUser,
  getUserList,
  deleteUserByName
}
