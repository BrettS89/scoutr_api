const router = require('express').Router();
const Controllers = require('../controllers/hunts');

router.get('/findcity', Controllers.findCity);

module.exports = router;
