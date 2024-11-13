// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  role: { type: String, default: 'user' },
  gender: { type: String },
  location: { type: String },
});

module.exports = mongoose.model('User', userSchema);
