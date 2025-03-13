const mongoose = require('mongoose');
require('dotenv').config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('DB CONNECTED');
  })
  .catch(e => {
    console.log(e);
  });

module.exports = mongoose;
