const router = require('express').Router();
const Controllers = require('../controllers/hunt');

router.post('/add', Controllers.addHunt);
router.post('/enter', Controllers.enterHunt);
router.patch('/won', Controllers.wonHunt);

module.exports = router;
