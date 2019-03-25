const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  'cloud_service', // 데이터베이스 이름
  'root', // 유저 명
  'rhkr1234', // 비밀번호
  {
    'host': 'localhost', // 데이터베이스 호스트
    'dialect': 'mysql', // 사용할 데이터베이스 종류
    define: {
        timestamps: false
    }
  }
);

module.exports = sequelize;