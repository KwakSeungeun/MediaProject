const path = require('path');
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
// const config = require(path.join(__dirname, '..', 'config', 'db.config.json'))[env]; //mac과 호환
const config = require('../config/db.config.json');
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

//모델정보를 읽기
db.User = require('./user')(sequelize, Sequelize);
db.Directory = require('./directory')(sequelize, Sequelize);
db.Files = require('./file')(sequelize, Sequelize);

//모델간의 관계를 정의
// db.User.hasMany(db.Directory,{ foreignKey: 'user_id' });

module.exports = db;