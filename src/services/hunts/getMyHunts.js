const EnteredHunt = require('../../models/EnteredHunt');

exports.myHuntsQuery = (_id, offset) => {
  return EnteredHunt.find({ userId: _id })
    .sort({ dateCreated: 'desc' })
    .populate('huntId')
    .skip(offset)
    .limit(20)
    .lean();
};
