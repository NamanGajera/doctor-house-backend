const cloudinary = require("../config/cloudinary");
const ErrorResponse = require("../utils/errorResponse");
const STATUS_CODES = require("../utils/statusCodes");

exports.uploadBuffer = async (fileBuffer, folder = "uploads", options = {}) => {
  try {
    if (!fileBuffer) {
      throw new ErrorResponse("File is required", STATUS_CODES.BAD_REQUEST);
    }

    // Default upload options
    const uploadOptions = {
      folder: `Doctor_House/${folder}`,
      ...options,
    };

    // Create a promise for uploading
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        uploadOptions,
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );

      // Convert buffer to stream and pipe to uploadStream
      const bufferStream = require("stream").Readable.from(fileBuffer);
      bufferStream.pipe(uploadStream);
    });
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw error;
  }
};

/**
 * Delete a file from Cloudinary by public ID
 * @param {String} publicId - Cloudinary public ID
 * @returns {Promise<Object>} Cloudinary deletion result
 */
exports.deleteFile = async (publicId) => {
  try {
    if (!publicId) {
      throw new ErrorResponse(
        "Public ID is required",
        STATUS_CODES.BAD_REQUEST
      );
    }

    return await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error("Cloudinary delete error:", error);
    throw error;
  }
};
