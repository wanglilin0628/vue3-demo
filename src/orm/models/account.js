const DataTypes = require('sequelize')

module.exports = {
  created_time: {
    type: DataTypes.DATE
  },
  update_time: {
    type: DataTypes.DATE
  },
  username: {
    type: DataTypes.STRING
  },
  name: {
    type: DataTypes.STRING
  },
  password: {
    type: DataTypes.STRING
  },
  department: {
    type: DataTypes.STRING
  },
  group: {
    type: DataTypes.STRING
  }
}
