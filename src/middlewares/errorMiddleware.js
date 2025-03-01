const ErrorResponse = require('../utils/errorResponse');
const STATUS_CODES = require('../utils/statusCodes');

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  
  // Log to console for dev
  console.error(err.stack);

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = `Resource not found`;
    error = new ErrorResponse(message, STATUS_CODES.NOT_FOUND);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = `Duplicate field value entered`;
    error = new ErrorResponse(message, STATUS_CODES.BAD_REQUEST);
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message);
    const formattedErrors = Object.keys(err.errors).map(field => ({
      param: field,
      message: err.errors[field].message
    }));
    error = new ErrorResponse(message.join(', '), STATUS_CODES.BAD_REQUEST, formattedErrors);
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    error = new ErrorResponse('Invalid token', STATUS_CODES.UNAUTHORIZED);
  }

  if (err.name === 'TokenExpiredError') {
    error = new ErrorResponse('Token expired', STATUS_CODES.UNAUTHORIZED);
  }

  res.status(error.statusCode || 500).json({
    statusCode: error.statusCode,
    message: error.message || 'Server Error',
    ...(error.errors && error.errors.length > 0 ? { errors: error.errors } : {})
  });
};

module.exports = errorHandler;