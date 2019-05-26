module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Files', {
        _id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        dir_id:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        url:{
            type: DataTypes.STRING,
            allowNull: false
        }
    },{
        timestamp: false
    });
  };