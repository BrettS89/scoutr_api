const successHandler = require('../utils/successHandler');
const errorHandler = require('../utils/errorHandler');

exports.register = async (req, res) => {
  try {

  } catch(e) {
    errorHandler(res, e, 'register');
  }
};

exports.login = async (req, res) => {
  try {

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
