const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  dateCreated: { type: Date, default: new Date() },
  lastLogin: { type: Date, default: new Date() },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  address: { type: String, default: null },
  city: { type: String, default: null },
  state: { type: String, default: null },
  zip: { type: String, default: null },
  logins: { type: Number, default: 0 },
  tokens: { type: Number, default: 0 },
  stripeId: { type: String, default: null },
  isAdmin: { type: Boolean, default: false },
  lat: { type: Number, default: null },
  lon: { type: Number, default: null },
});

module.exports = mongoose.model('User', userSchema);
