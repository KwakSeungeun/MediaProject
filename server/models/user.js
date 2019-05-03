module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Users', {
        _id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false
        },
        pw:{
            type: DataTypes.STRING,
            allowNull: false
        }
    },{
        timestamp: false
    });
  };