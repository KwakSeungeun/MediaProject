var express = require('express');
var router = express.Router();


// 브라우저에서 보이는 화면 get!
router.get('/', function(req, res, next) {
  res.render('files', { title: 'Express' });
});

// 파일 업로드
router.get('/upload', function(req, res, next) {
    res.render('files', { title: 'Express' });
});

router.get('/download', function(req, res, next) {
    res.render('files', { title: 'Express' });
});

router.delete('/', function(req, res, next) {
    res.render('files', { title: 'Express' });
});


// 폴더 자동화
router.get('/arrange', function(req, res, next) {
    res.render('files', { title: 'Express' });
});

module.exports = router;
