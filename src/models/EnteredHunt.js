const mongoose = require('mongoose');

const enteredHuntSchema = new mongoose.Schema({
  dateCreated: { type: Date, default: new Date() },
  huntId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hunt', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true  },
});

module.exports = mongoose.model('EnteredHunt', enteredHuntSchema);
