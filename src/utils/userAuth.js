const jwt = require('jsonwebtoken');

exports.userAuth = token => {
  if (!token) {
    throw {
      status: 401,
      error: new Error('no auth token'),
    };
  }
};
