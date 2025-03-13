const { Schema, model } = require('mongoose');

const slotSchema = Schema({
  turfId: { type: Schema.Types.ObjectId, ref: 'Turf', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: String, required: true }, // Format: YYYY-MM-DD
  slot: { type: String, required: true },
});

const Slot = model('slot', slotSchema);

module.exports = Slot;
