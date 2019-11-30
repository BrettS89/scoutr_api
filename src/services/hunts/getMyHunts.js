const Hunt = require('../../models/Hunt');

exports.myHuntsQuery = (_id, offset) => {
  return Hunt.find({ userId: _id })
    .sort({ dateCreated: 'desc' })
    .skip(offset)
    .limit(20)
    .lean();
};
