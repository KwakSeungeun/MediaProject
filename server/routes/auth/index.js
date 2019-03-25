const router = require('express').Router();
const controller = require('./auth.controller');
const auth_middleware = require('../middlewares/auth.check');

router.post('/register', controller.register);
router.post('/login', controller.login);
router.get('/check', auth_middleware);
router.get('/check', controller.check);

module.exports = router;