const Sequelize = require('sequelize');
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
db.User.hasMany(db.Directory, { foreignKey: 'user_id', sourceKey:'_id' });
db.Directory.belongsTo(db.User, { foreignKey: 'user_id', targetKey: '_id' });

db.Directory.hasMany(db.Files, { foreignKey: 'dir_id', sourceKey: '_id' });
db.Files.belongsTo(db.Directory, { foreignKey: 'dir_id', targetKey: '_id' });


module.exports = db;