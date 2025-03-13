const express = require('express');

const {
  signup,
  login,
  users,
  accountDetails,
} = require('../controllers/user-controllers');

// const User = require('../db/models/user-schema');

const router = express.Router();

router.post('/signup', signup);

router.post('/login', login);

router.get('/users', users);

router.get('/accountDetails', accountDetails);

module.exports = router;
