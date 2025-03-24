import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://turf-booking-2ptt.onrender.com/api',
  // baseURL: 'http://localhost:3000/api',
  timeout: 5000,
});

export default instance;
