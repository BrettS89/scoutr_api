const User = require('../models/User');
const successHandler = require('../utils/successHandler');
const errorHandler = require('../utils/errorHandler');
const userAuth = require('../utils/userAuth');
const stripe = require('../api/stripe');

exports.addCreditCard = async (req, res) => {
  try {
    const user = await userAuth(req.header('authorization'));
    const foundUser = await user.findById(user._id);
    const { id, card: { brand, last4 } } = await stripe.addCreditCard(
      req.body.cardNumber,
      req.body.expMonth,
      req.body.exp_year,
      req.body.cvc,
    );
    const response = await stripe.createCustomer(id, foundUser.email);
    foundUser.stripeId = res.id;
    foundUser.cardType = brand;
    foundUser.cardLast4 = last4;
    const updatedUser = await foundUser.save(foundUser);
    successHandler(res, 200, updatedUser, null);
  } catch(e) {
    errorHandler(res, e, 'createCardToken');
  }
};

exports.purchaseTokens = async (req, res) => {
  try {
    const user = await userAuth(req.header('authorization'));
    let foundUser = await User.findById(user._id);
    foundUser.tokens += req.body.tokens;
    foundUser = await foundUser.save();
    successHandler(res, 200, foundUser, null);
  } catch(e) {
    errorHandler(res, e, 'addTokens');
  }
};
