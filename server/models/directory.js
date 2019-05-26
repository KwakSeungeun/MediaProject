module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Directories', {
        _id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        pid:{
            type: DataTypes.INTEGER,
            allowNull: true // root의 경우 가르키는게 없으니까
        },
        level:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        user_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        }
    },{
        timestamp: false
    });
  };