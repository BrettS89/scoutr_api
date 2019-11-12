const mongoose = require('mongoose');

const playedHuntSchema = new mongoose.Schema({
  huntId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hunt', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true  },
});

module.exports = mongoose.model('PlayedHunt', playedHuntSchema);
