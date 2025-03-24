// paymentRoute.js
const express = require('express');
const Razorpay = require('razorpay');
const router = express.Router();

const razorpayInstance = new Razorpay({
  key_id: 'rzp_test_GFQKcHCLvHeM90', // Replace with your Test Key ID
  key_secret: 'IOKFov4y8q8j56IKImQZV10u', // Replace with your Test Key Secret
});

// Create Order API
router.post('/create-order', async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100, // Amount is in smallest currency unit (Paise)
      currency: 'INR',
      receipt: 'receipt#1',
    };

    const order = await razorpayInstance.orders.create(options);
    res.status(200).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
