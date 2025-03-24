// routes/paymentRoute.js
const express = require('express');
const { createOrder } = require('../controllers/paymentController');
const router = express.Router();

// Route to create order
router.post('/create-order', createOrder);

module.exports = router;
