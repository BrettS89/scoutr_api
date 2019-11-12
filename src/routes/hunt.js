const router = require('express').Router();
const Controllers = require('../controllers/hunt');

router.post('/add', Controllers.addHunt);
router.patch('/play', Controllers.playHunt);
router.patch('/won', Controllers.wonHunt);

module.exports = router;
