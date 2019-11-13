const jwt = require('jsonwebtoken');
const keys = require('../config');

exports.userAuth = async token => {
  if (!token) {
    throw {
      status: 401,
      error: new Error('no auth token'),
    };
  }

  try {
    await jwt.verify(token, keys.jwtSecret);
  } catch(e) {
    const error = (e.toString().split(' ')[2]);

    if(error === 'signature') {
      throw {
        status: 401,
        error: new Error('Bad token signature'),
      };
    }
  }

  const decodedUser = jwt.decode(receivedToken);

  if (!decodedUser) {
    throw {
      status: 401,
      error: new Error('Unauthorized'),
    };
  }

  // const token = jwt.sign({ user: decodedUser }, keys.jwtSecret, { expiresIn: 1 });
  return decodedUser;
};
