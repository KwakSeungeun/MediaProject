const router = require('express').Router();
const controller = require('./search.controller');

router.post('/face/detection', controller.faceDetection);

module.exports = router;