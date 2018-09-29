// Third party modules imports.
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Mongoose user schema
const userSchema = new Schema({
  // Account information
  'account': {
    'userName': { type: String, required: true, unique: true, trim: true },
    'password': { type: String, required: true },
    'isActive': { type: Boolean, required: true, default: false }
  },
  // Personal information
  'personal': {
    'firstName': { type: String, required: true, trim: true },
    'lastName': { type: String, required: true, trim: true },
    'email': { type: String, required: true, trim: true },
    'birthDate': { type: Date, required: true },
    'gender': { type: String, required: true , enum: ['male', 'female']}
  }
}, { versionKey: false });

// Exports user schema
module.exports = mongoose.model('User', userSchema);