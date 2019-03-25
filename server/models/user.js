const Sequelize = require('sequelize');
const sequelize = require('../config/db.config');

const User = sequelize.define('Users',{
    _id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false
    },
    pw:{
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = User;