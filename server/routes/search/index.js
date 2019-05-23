const router = require('express').Router();
const controller = require('./search.controller');

router.post('/face/detection', controller.faceDetection);
router.get('/face/comparison', controller.faceComparison)
module.exports = router;