const mongoose = require('mongoose');

// db Schema
const Schema = mongoose.Schema;
const AppUsersSchema = new Schema({
  fname: {
    type: String,
    required: true
  },
  lname: {
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
const AppUser = mongoose.model('AppUser', AppUsersSchema);

module.exports = AppUser;