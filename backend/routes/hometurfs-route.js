const express = require('express');

const Turf = require('../db/models/turf-schema');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const response = await Turf.find();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

module.exports = router;
