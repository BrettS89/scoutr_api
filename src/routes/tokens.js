const router = require('express').Router();
const Controllers = require('../controllers/tokens');

router.patch('/addcard', Controllers.addCreditCard);
router.patch('/purchase', Controllers.purchaseTokens);

module.exports = router;
