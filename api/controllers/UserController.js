// Import user model.
const User = require('../models/User');

// Import configuration file.
const config = require('../../config');

/**
 * Get list of users -includes not actives-.
 * @param {String} queries Queries for fetching certain datas.
 * @param {Number} limit Limiting variable for paging.
 * @param {Number} skip Skipping variable for paging.
 * @param {String} sort Sorting variable -if the minus is placed in the reverse order-.
 * @param {function} callback Callback function.
 */
const getUsers = function (queries, limit, skip, sort, callback) {
  User.find(queries).limit(limit).skip(skip).sort(sort).exec(function (err, users) {
    if (err) return callback(err, null);
    return callback(null, users);
  });
};

/**
 * Get user given id.
 * @param {ObjectId} userID ID of the user to be fetched.
 * @param {function} callback Callback function.
 */
const getUserById = function (userID, callback) {
  User.findById(userID, function (err, user) {
    if (err) return callback(err, null);
    if (!user) {
      return callback(config.httpErrors.notFoundErr, null);
    } else {
      return callback(null, user);
    }
  });
};

/**
 * Creates a new user if it is not registered in database.
 * @param {String} userName User name of user to be created.
 * @param {String} email E-mail address of the user to be created.
 * @param {String} password Password of the user account.
 * @param {String} firstName First name of the user to be created.
 * @param {String} lastName Last name of the user to be created.
 * @param {Date} birthDate Birth date of the user.
 * @param {String} gender Gender of the user for gender specific issues.
 * @param {function} callback Callback function.
 */
const createUser = function (userName, email, password, firstName, lastName, birthDate, gender, callback) {
  // Create new user object
  const user = new User({
    // Account information
    'account': {
      'userName': userName,
      'password': password
    },
    // Personal information
    'personal': {
      'firstName': firstName,
      'lastName': lastName,
      'email': email,
      'birthDate': birthDate,
      'gender': gender
    }
  });
  // Save user to database.
  user.save(function (err, user) {
    if (err) return callback(err, null);
    return callback(null, user);
  });
};

/**
 * Update user information which has the id userID.
 * @param {ObjectId} userID ID of the user to be updated.
 * @param {String} newPassword New password to be replace the old one.
 * @param {String} newfirstName New first name.
 * @param {String} newlastName New last name.
 * @param {function} callback Callback function.
 */
const updateUser = function (userID, newPassword, newfirstName, newlastName, callback) {
  User.findById(userID, function (err, user) {
    if (err) return callback(err, null);
    if (!user) return callback(config.httpErrors.notFoundErr, null);
    // Update information if they sent by client.
    if (newPassword != undefined) user.account.password = newPassword;
    if (newfirstName != undefined) user.personal.firstName = newfirstName;
    if (newlastName != undefined) user.personal.lastName = newlastName;
    // Save updated user to database.
    user.save(function (err, user) {
      if (err) return callback(err, null);
      return callback(null, user);
    });
  });
};

/**
 * Deletes user which has the id userID.
 * Actually, it does not remove in database,
 * only isActive variable of the user is changed to false.
 * @param {ObjectId} userID ID of the user to be deleted.
 * @param {function} callback Callback function.
 */
const deleteUser = function (userID, callback) {
  User.findById(userID, function (err, user) {
    if (err) return callback(err, null);
    if (!user) return callback(config.httpErrors.notFoundErr, null);
    user.account.isActive = false;
    user.save(function (err, user) {
      if (err) return callback(err, null);
      return callback(null, user);
    });
  });
};

// Exports user controller functions.
module.exports = {
  getUsers: getUsers,
  getUserById: getUserById,
  createUser: createUser,
  updateUser: updateUser,
  deleteUser: deleteUser
};