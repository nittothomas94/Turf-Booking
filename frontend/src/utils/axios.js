import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://turf-booking-2ptt.onrender.com/api',
  timeout: 5000,
});

export default instance;
