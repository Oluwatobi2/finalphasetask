const mongoose = require('mongoose');
const { Schema } = mongoose;

const location = new Schema({
      locationName: String,
      Description: String,
      Phone: String,
      contactPerson: String,
      Coordinates: String
});

const userSchema = mongoose.model('users', location);

module.exports = { userSchema };