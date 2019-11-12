const jwt = require('jsonwebtoken');

exports.adminAuth = token => {
  if (!token) {
    throw {
      status: 401,
      error: new Error('no auth token'),
    };
  }
};
