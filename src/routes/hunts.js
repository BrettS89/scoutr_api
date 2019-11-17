const router = require('express').Router();
const Controllers = require('../controllers/hunts');

router.get('/findcity', Controllers.findCity);
router.get('/find', Controllers.findHunts);

module.exports = router;
