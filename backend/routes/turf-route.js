const express = require('express');

const Turf = require('../db/models/turf-schema');

const checkToken = require('../middlewares/check-token');

const router = express.Router();

router.get('/', checkToken(['ADMIN', 'USER']), async (req, res) => {
  try {
    const response = await Turf.find(req.query);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

router.get('/:id', checkToken(['ADMIN', 'USER']), async (req, res) => {
  try {
    const { id } = req.params;

    const response = await Turf.findById(id);

    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({ messsage: e.message, error: e });
  }
});

router.post('/', checkToken(['ADMIN']), async (req, res) => {
  try {
    const body = req.body;

    // Convert pricePerHover to a number
    if (body.pricePerHover) {
      body.pricePerHover = Number(body.pricePerHover);
    }

    console.log(body);

    const response = await Turf.create(body);

    console.log(response);

    return res.status(201).json({ message: 'TURF ADDED', data: response });
  } catch (e) {
    console.error('Error adding turf:', e); // Full error log
    return res.status(500).json({ message: e.message, error: e });
  }
});

router.delete('/:id', checkToken(['ADMIN']), async (req, res) => {
  try {
    const { id } = req.params;

    const response = await Turf.findByIdAndDelete(id);

    return res.status(201).json({ message: 'TURF DELETED' });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

router.patch('/:id', checkToken(['ADMIN']), async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id);
    const { body } = req;
    const response = await Turf.findByIdAndUpdate(id, body);

    return res.status(201).json({ message: 'Updated' });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

module.exports = router;
