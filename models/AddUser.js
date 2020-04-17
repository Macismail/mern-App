const mongoose = require('mongoose');

// db Schema
const Schema = mongoose.Schema;
const AddUsersSchema = new Schema({
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
const AddUser = mongoose.model('AddUser', AddUsersSchema);

module.exports = AddUser;