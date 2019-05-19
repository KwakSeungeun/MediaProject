module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Users', {
        // primary key를 의미, 유저의 번호
        _id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        //실제 유저의 아이디
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