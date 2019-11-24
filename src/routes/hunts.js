const router = require('express').Router();
const Controllers = require('../controllers/hunts');

router.get('/findcity', Controllers.findCity);
router.get('/find', Controllers.findHunts);
router.get('/myhunts', Controllers.getMyHunts);

module.exports = router;
