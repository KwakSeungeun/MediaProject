var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// auth 체크하는 미들웨어 만들기 => 다른 api들에서 유저 확인하는게 필요하면 미들웨어로 제작해서 하기
// 웹서버 My-sql 사용하기 (ODM 쓰기)
// 회원가입
router.get('/signup', function(req, res, next) {
  // 웹 서버 DB에 저장 (아이디 중복 체크와 핸드폰 인증 필수) DB 저장 안되면 Fail
  // DB에 저장이 완료되면 Keystone에 유저 생성 => keystone api 이용
  // https://developer.openstack.org/api-ref/identity/v3/
  // /v3/users
  // Create user
  // Role의 권한도 줘야함
  // 완료 되면 success return

  res.send('respond with a resource');
});

  // 로그인
router.get('/signup', function(req, res, next) {
  // 웹 서버 DB에 있는 유저인지 체크 아니면 fail
  // keystone에게 token줌 => auth 확인하고 아니면 fail
  // 맞으면 success => return
  res.send('respond with a resource');
});

module.exports = router;
