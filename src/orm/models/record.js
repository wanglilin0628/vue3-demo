const DataTypes = require('sequelize')

module.exports = {
  op_time: { // 创建时间
    type: DataTypes.STRING
  },
  username: { // 用户名
    type: DataTypes.STRING
  },
  op_flag: { // 操作类型
    type: DataTypes.INTEGER
  },
  op_state: { // 操作状态
    type: DataTypes.BOOLEAN
  },
  op_remark: { // 具体操作内容
    type: DataTypes.BLOB
  }
}
