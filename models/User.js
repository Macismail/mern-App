const mongoose = require('mongoose');

// db Schema
const Schema = mongoose.Schema;
const UsersSchema = new Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});
// db Model
const User = mongoose.model('User', UsersSchema);

module.exports = User;