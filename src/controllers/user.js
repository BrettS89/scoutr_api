const User = require('../models/User');
const successHandler = require('../utils/successHandler');
const errorHandler = require('../utils/errorHandler');
const registerService = require('../services/user/register');
const loginService = require('../services/user/login');

exports.register = async (req, res) => {
  try {
    const foundUser = await user.findOne({ email: req.body.email });
    if (foundUser) {
      throw {
        status: 400,
        error: new Error('This email already exists'),
      };
    }
    const hashedPassword = registerService.hashPassword(req.body.password);
    req.body.password = hashedPassword;
    const user = await registerService.createUserInstance(req.body).save();
    const token = registerService.createToken(user._id);
    successHandler(res, 201, null, token)
  } catch(e) {
    errorHandler(res, e, 'register');
  }
};

exports.login = async ({ body: { email, password } }, res) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw {
        status: 404,
        error: new Error('no user found'),
      };
    }
    const passwordMatch = loginService.checkPassword(password, user.password);
    if (!passwordMatch) {
      throw {
        status: 401,
        error: new Error('incorrect login credentials'),
      };
    }
    const token = registerService.createToken(user._id);
    successHandler(res, 200, null, token);
  } catch(e) {
    errorHandler(res, e, 'login');
  }
};

exports.isLoggedIn = async (req, res) => {
  try {

  } catch(e) {
    errorHandler(res, e, 'isLoggedIn');
  }
};
