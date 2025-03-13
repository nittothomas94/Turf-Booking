const cloudinary = require('../config/cloudinary');
const multer = require('multer');
const streamifier = require('streamifier');
const path = require('path');

// Configure Multer for in-memory storage (no local storage)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Manually set the Cloudinary folder name
const PROJECT_FOLDER = 'user-management-images';

// Function to upload image to Cloudinary
const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded!' });
    }

    // Convert buffer to stream and upload directly to Cloudinary
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'Turf Booking Images', // Fixed folder name
        public_id: path.parse(req.file.originalname).name, // Remove extension
        use_filename: true,
        unique_filename: false,
      },
      (error, result) => {
        if (error) {
          return res
            .status(500)
            .json({ error: 'Image upload failed!', details: error });
        }

        res.status(200).json({
          message: 'Image uploaded successfully!',
          cloudinaryUrl: result.secure_url,
        });
      }
    );

    streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
  } catch (error) {
    console.error('Server Error:', error); // Log full error
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};

module.exports = { upload, uploadImage };
