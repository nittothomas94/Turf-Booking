const express = require('express');
const {
  getBookedSlots,
  bookSlot,
  bookingsOfUser,
  allBookingsOfUsers,
} = require('../controllers/slotController');

const router = express.Router();

router.get('/bookedslots:turfId', getBookedSlots);

router.post('/', bookSlot);

router.get('/bookingsofuser', bookingsOfUser);

router.get('/allbookingsofusers', allBookingsOfUsers);

module.exports = router;
