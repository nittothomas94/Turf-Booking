const express = require('express');

const TurfRoute = require('./turf-route');
const ImageRoute = require('./image-route');
const userRoute = require('./user-route');
const slotRoute = require('./slots-route');
const adminRoute = require('./admin-route');
const HomeTurfRoute = require('./hometurfs-route');

const router = express.Router();

router.use('/turfs', TurfRoute);
router.use('/hometurf', HomeTurfRoute);
router.use('/uploadImage', ImageRoute);
router.use('/user', userRoute);
router.use('/slots', slotRoute);
router.use('/admin', adminRoute);

module.exports = router;
