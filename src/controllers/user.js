const successHandler = require('../utils/successHandler');
const errorHandler = require('../utils/errorHandler');

exports.register = async (req, res) => {
  try {

  } catch(e) {
    errorHandler(res, e, 'register');
  }
};
