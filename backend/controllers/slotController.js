const Slot = require('../db/models/slotSchema');
const checkToken = require('../middlewares/check-token');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Get booked slots for a turf on a specific date
module.exports.getBookedSlots = async (req, res) => {
  try {
    //api sends this data form frondend
    const { turfId } = req.params;
    const { date } = req.query;

    const bookedSlots = await Slot.find({ turfId, date }).select('slot');

    return res.status(200).json({ bookedSlots: bookedSlots.map(s => s.slot) });
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching booked slots' });
  }
};

// console.log(this.getBookedSlots);

// Book a slot
module.exports.bookSlot = async (req, res) => {
  try {
    const { turfId, userId, date, slot } = req.body;

    // Validate required fields
    if (!turfId || !userId || !date || !slot) {
      return res.status(400).json({ message: 'All fields are required!' });
    }

    // Check if the slot is already booked
    const existingBooking = await Slot.findOne({ turfId, date, slot });
    if (existingBooking) {
      return res.status(400).json({ message: 'Slot already booked!' });
    }

    // Create a new booking
    const newBooking = new Slot({
      turfId,
      userId, // Storing user ID
      date,
      slot,
    });

    await newBooking.save();
    res
      .status(201)
      .json({ message: 'Booking successful!', booking: newBooking });
  } catch (error) {
    console.error('Booking error:', error.message, error.stack); // Log full error
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
// router.post('/slots', verifyToken, async (req, res) => {});

// gets slots of the user by _id
module.exports.bookingsOfUser = async (req, res) => {
  try {
    const isAuthorized = checkToken(['ADMIN', 'USER']);

    if (!isAuthorized) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    //token
    const bearerToken = req.headers.authorization;

    //checking no there "token"
    if (!bearerToken) {
      return res
        .status(401)
        .json({ message: 'Unauthorized: No token provided' });
    }

    const token = bearerToken.split(' ')[1];

    // getiing used id using the token
    const isValid = jwt.verify(token, process.env.SECRET_KEY);

    // console.log(isValid);

    const response = await Slot.find({
      userId: isValid.id,
    });

    return res.status(200).json(response);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error fetching booked slots of the user' });
  }
};

// get all bookings route
module.exports.allBookingsOfUsers = async (req, res) => {
  try {
    const response = await Slot.find();

    return res.status(200).json(response);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error fetching booked slots of the user' });
  }
};
