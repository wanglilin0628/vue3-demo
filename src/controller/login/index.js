const Account = require('../../orm')

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

module.exports = login
