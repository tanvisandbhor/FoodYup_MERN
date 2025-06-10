// Routes/payment.js
const express = require('express');
const Razorpay = require('razorpay');
require('dotenv').config();

const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

router.post('/create-order', async (req, res) => {
  const { amount } = req.body;

  const options = {
    amount: amount * 100, // convert to paise
    currency: "INR",
    receipt: "order_rcptid_" + Math.floor(Math.random() * 10000)
  };

  try {
    const order = await razorpay.orders.create(options);
    res.status(200).json({ success: true, order });
  } catch (err) {
    console.error("Razorpay error:", err);
    res.status(500).json({ success: false, message: "Payment order creation failed" });
  }
});

module.exports = router;
