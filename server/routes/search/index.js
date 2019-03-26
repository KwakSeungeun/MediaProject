const router = require('express').Router();
const controller = require('./search.controller');

router.get('/face', controller.searchFace);

module.exports = router;