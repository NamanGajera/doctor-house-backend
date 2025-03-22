const multer = require("multer");
const ErrorResponse = require("../utils/errorResponse");
const STATUS_CODES = require("../utils/statusCodes");

const storage = multer.memoryStorage();

const fileUpload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: function (req, file, cb) {
    // Allowed file types
    const filetypes = /jpeg|jpg|png|gif|bmp|webp|svg|tiff|heic|avif/;
    // Check mimetype
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype) {
      return cb(null, true);
    } else {
      cb(
        new ErrorResponse(
          "Error: Images only (jpeg, jpg, png, gif)",
          STATUS_CODES.BAD_REQUEST
        )
      );
    }
  },
});

module.exports = fileUpload;
