const sequelize = require('../../orm/index.js')
const record = require('../../orm/models/record.js')
const Record = sequelize.define('Record', record)
const moment = require('moment-timezone')
moment.tz.setDefault('Asia/Shanghai')

/**
 * 根据用户名查询记录
 * @param {String} username 用户名
 */
const getRecords = async (username) => {
  const recordList = await Record.findAll({
    where: {
      username: username
    },
    order: [['op_time', 'DESC']]
  })
  return recordList || null
}

/**
 * 新增记录
 */
const addRecord = async (payload) => {
  let result = null
  try {
    result = await Record.create({
      op_time: moment().format('YYYY-MM-DD HH:mm:ss').toString(),
      username: payload.username,
      op_flag: payload.flag,
      op_state: payload.state,
      op_remark: payload.remark
    })
  } catch (e) {
    console.log('插入记录时发生错误:', e)
  }
  return result
}

module.exports = {
  getRecords,
  addRecord
}
