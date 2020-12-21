export default (sequelize, DataTypes) => {
  return sequelize.define('account',{
    create_time: {
      type: DataTypes.DATE
    },
    update_time: {
      type: DataTypes.DATE
    },
    username: {
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
  })
}
