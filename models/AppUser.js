const mongoose = require('mongoose');

// db Schema
const Schema = mongoose.Schema;
const AppUsersSchema = new Schema({
  fname: String,
  lname: String,
  email: String,
  password: String,
  date: {
    type: String,
    default: Date.now()
  }
});
// db Model
const AppUser = mongoose.model('AppUser', AppUsersSchema);

module.exports = AppUser;