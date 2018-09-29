// Third party modules imports.
const express = require('express');
const moment = require('moment');
const config = require('../../config');
const router = express.Router();

// Import user controller.
const UserController = require('../controllers/UserController');

/** 
 * GET /api/v1/users => Get users -includes not active users- listing.
 */
router.get('/', function (req, res, next) {
  let queries = {};
  // Get query params if exist
  let active = req.query.active;
  let gender = req.query.gender;
  let limit = parseInt(req.query.limit);
  let skip = parseInt(req.query.skip);
  (active != undefined) ? (queries['account.isActive'] = active) : undefined;
  (gender != undefined) ? (queries['personal.gender'] = gender) : undefined;
  let sort = (req.query.sort) ? req.query.sort.split(',').join(' ') : undefined;

  // Call get users function.
  UserController.getUsers(queries, limit, skip, sort, function (err, users) {
    if (err) next(err);
    else res.json({ 'count': users.length, 'users': users });
  });
});

/** 
 * POST /api/v1/users => Create user and add it to the database.
 */
router.post('/', function (req, res, next) {
  // Get account and personal informations
  const userName = req.body.userName.trim();
  const password = req.body.password;
  const firstName = req.body.firstName.trim();
  const lastName = req.body.lastName.trim();
  const email = req.body.email.trim();
  const birthDate = moment(req.body.birthDate, 'DD/MM/YYYY').toDate();
  const gender = req.body.gender;
  // Call create user function.
  UserController.createUser(userName, password, firstName, lastName, email, birthDate, gender, function (err, user) {
    if (err) {
      if (err.code == 11000) next(config.httpErrors.alreadyExistErr);
      else if (err.name == 'ValidationError') next(config.httpErrors.validationErr);
      else next(err);
    } else res.json({ 'user': user });
  });
});

/** 
 * GET /api/v1/users/:userID => Get user which user id is given.
 */
router.get('/:userID', function (req, res, next) {
  // Get userID from url parameter.
  const userID = req.params.userID;
  // Send the userID to getUserById function.
  UserController.getUserById(userID, function (err, user) {
    if (err) next(err);
    else res.json({ 'user': user });
  });
});

/** 
 * PUT /api/v1/users/:userID => Update user which user id is given.
 */
router.put('/:userID', function (req, res, next) {
  // Get userID from url parameter.
  const userID = req.params.userID;
  // Informations to be updated.
  const newPassword = req.body.password;
  const newFirstName = req.body.firstName;
  const newLastName = req.body.lastName;
  // Call update user function.
  UserController.updateUser(userID, newPassword, newFirstName, newLastName, function (err, user) {
    if (err) next(err);
    else res.json({ 'user': user });
  });
});

/** 
 * DELETE /api/v1/users/:userID => Delete user which user id is given.
 * Actually, it does not delete user in database, only isActive variable
 * of user is changed to false.
 */
router.delete('/:userID', function (req, res, next) {
  // Get userID from url parameter.
  const userID = req.params.userID;
  // Call delete user function.
  UserController.deleteUser(userID, function (err, user) {
    if (err) next(err);
    else res.json({ 'user': user });
  });
});

// Export route.
module.exports = router;
