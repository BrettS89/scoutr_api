const router = require('express').Router();
const Controllers = require('../controllers/user');

router.post('/register', Controllers.register);
router.post('/login', Controllers.login);
router.post('/isLoggedIn', Controllers.isLoggedIn);

module.exports = router;
