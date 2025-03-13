// Both Admin and User use this Schema

const { Schema, model } = require('mongoose');

const userSchema = Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  //RBAC
  role: {
    type: String,
    default: 'USER',
    enum: ['USER', 'ADMIN'],
  },
});

const User = model('users', userSchema);

module.exports = User;
