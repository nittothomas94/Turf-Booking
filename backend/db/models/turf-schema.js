const { Schema, model } = require('mongoose');

const TurfSchema = Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    city: {
      type: String,
      trim: true,
      required: true,
    },
    location: {
      type: String,
      trim: true,
    },
    googleMap: {
      type: String,
      trim: true,
    },

    pricePerHour: {
      type: Number,
      min: 300,
      max: 1800,
      required: true,
    },
    image: {
      type: [String],
    },
    availableGame: {
      type: String,
      trim: true,
    },
    phoneNumber: {
      type: String,
    },
  },
  { timestamps: true }
);

const Turf = model('turfs', TurfSchema); // Turf model/modelName create with the colletion name "turfs"

module.exports = Turf;
