const express = require('express');
const {
  signup,
  login,
  accountDetails,
} = require('../controllers/admin-controllers');

const router = express.Router();

router.post('/signup', signup);

router.post('/login', login);

router.get('/accountDetails', accountDetails);

module.exports = router;
