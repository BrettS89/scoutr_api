const jwt = require('jsonwebtoken');

exports.adminAuth = async token => {
  if (!token) {
    throw {
      status: 401,
      error: new Error('no auth token'),
    };
  }

  await jwt.verify(token, keys.jwtSecret);
  
  const decodedUser = jwt.decode(token);

  if  (!decodedUser) {
    throw {
      status: 401,
      error: new Error('Unauthorized'),
    };
  }

  return decodedUser;
};
