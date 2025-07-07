const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// .env file accessessing to all files setup
const dotenv = require('dotenv');
dotenv.config('./.env');

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

//database connect middleware
require('./db');

//routes path stores to the variable named "routes" and execute after all mentioned middlware next as a middleware
//main Part
const routes = require('./routes');
app.use('/api', routes);

//if no routes mathing this will match and execurte this middlware
app.use('*', (req, res) => {
  return res.status(404).json({ message: 'page Not Found' });
});

app.listen(3000, () => {
  console.log('App is runnig');
});
