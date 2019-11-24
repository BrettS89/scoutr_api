const Hunt = require('../../models/Hunt');

exports.myHuntsQuery = async (_id, offset) => {
  return await Hunt.find({ userId: _id })
    .sort({ dateCreated: 'desc' })
    .skip(offset)
    .limit(20)
    .lean();
};
