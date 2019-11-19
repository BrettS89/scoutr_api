const mongoose = require('mongoose');

const huntSchema = new mongoose.Schema({
  title: { type: String, required: true },
  prize: { type: String, required: true },
  prizeCost: { type: Number, required: true },
  prizePic: { type: String, required: true },
  finished: { type: Boolean, default: false },
  location: {
    type: {
      type: String,
      enum: ['Point'],
    },
    coordinates: { type: [Number], },
  },
  tokens: { type: Number, required: true },
  description: { type: String, required: true },
  players: { type: Number, default: 0 },
  winner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  city: { type: String, required: true },
  city2: { type: String, required: true },
  state: { type: String, required: true },
  stateAbv: { type: String, required: true },
  zip: { type: String, required: true },
  fullAddress: { type: String, required: true },
});

module.exports = mongoose.model('Hunt', huntSchema);
