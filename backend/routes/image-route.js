const express = require('express');
const {
  upload,
  uploadImage,
} = require('../controllers/image-upload-controller');
const router = express.Router();

// Route: Upload image (no project name in URL)
router.post('/', upload.single('avatar'), uploadImage);

module.exports = router;
