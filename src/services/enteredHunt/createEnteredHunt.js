const EnteredHunt = require('../../models/EnteredHunt');

exports.createEnteredHunt = (userId, huntId) => {
  return new EnteredHunt({
    huntId,
    userId,
  });
};
