var express = require('express');
var router = express.Router();

/// input : image, output images
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/// 추가적으로 이름 태그붙이거나  그런거 개발하기

module.exports = router;
