const User = require('../models/User');
const successHandler = require('../utils/successHandler');
const errorHandler = require('../utils/errorHandler');
const userAuth = require('../utils/userAuth');
const stripe = require('../api/stripe');

exports.addCreditCard = async (req, res) => {
  try {
    const user = await userAuth(req.header('authorization'));
    const foundUser = await User.findById(user._id);
    const { id, card: { brand, last4 } } = await stripe.createCardToken(
      req.body.cardNumber,
      req.body.exp_month,
      req.body.exp_year,
      req.body.cvc,
    );

    if (foundUser.stripeId) {
      await stripe.updateCustomer(foundUser.stripeId, id);
    } else {
      const response = await stripe.createCustomer(id, foundUser.email);
      foundUser.stripeId = response.id;
    }

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
    if (!foundUser.stripeId) {
      throw {
        status: 400,
        error: new Error('No stripe ID'),
      };
    }
    const amount = req.body.tokens * 100;
    await stripe.processPayment(foundUser.stripeId, amount);
    foundUser.tokens += req.body.tokens;
    foundUser = await foundUser.save();
    successHandler(res, 200, foundUser, null);
  } catch(e) {
    errorHandler(res, e, 'addTokens');
  }
};
