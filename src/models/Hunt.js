const mongoose = require('mongoose');

const huntSchema = new mongoose.Schema({
  prize: { type: String, required: true },
  prizePic: { type: String, required: true },
  finished: { type: Boolean, default: false },
  coords: {
    lat: { type: Number, required: true },
    lon: { type: Number, required: true },
  },
  tokens: { type: Number, required: true },
  description: { type: String, required: true },
  players: { type: Number, default: 0 },
  winner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('Hunt', huntSchema);
