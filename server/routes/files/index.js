const router = require('express').Router();
const controller = require('./files.controller');

router.get('/list', controller.getList);
router.get('/download', controller.download);
router.get('/arrange', controller.arrange);
router.post('/', controller.upload);
router.delete('/', controller.delete); 

module.exports = router;