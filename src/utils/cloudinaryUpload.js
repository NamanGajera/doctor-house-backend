const cloudinary = require('cloudinary').v2;
const fs = require('fs');

// Configure Cloudinary (add these to your .env file)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadToCloudinary = async (filePath, folder = 'uploads', options = {}) => {
  try {
    // Validate file path
    if (!filePath) {
      throw new Error('File path is required');
    }

    // Default upload options
    const uploadOptions = {
      folder: `your_app_name/${folder}`,
      // You can add more default options here
      ...options
    };

    // Upload file to Cloudinary
    const result = await cloudinary.uploader.upload(filePath, uploadOptions);

    // Remove local file after upload
    fs.unlinkSync(filePath);

    return result;
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw error;
  }
};

/**
 * Delete file from Cloudinary
 * @param {string} publicId - Public ID of the file to delete
 * @returns {Promise<Object>} - Cloudinary delete result
 */
const deleteFromCloudinary = async (publicId) => {
  try {
    if (!publicId) {
      throw new Error('Public ID is required');
    }

    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    throw error;
  }
};

module.exports = {
  uploadToCloudinary,
  deleteFromCloudinary
};