const DataTypes = require('sequelize')

module.exports = {
  created_time: { // 创建时间
    type: DataTypes.STRING
  },
  update_time: { // 修改时间
    type: DataTypes.STRING
  },
  username: { // 用户名
    type: DataTypes.STRING
  },
  name: { // 姓名
    type: DataTypes.STRING
  },
  password: { // 密码
    type: DataTypes.STRING
  },
  department: { // 部门
    type: DataTypes.STRING
  },
  group: { // 团队
    type: DataTypes.STRING
  }
}
