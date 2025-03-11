const asyncHandler = require("../utils/asyncHandler");
const authService = require("../services/auth.service");
const STATUS_CODES = require("../utils/statusCodes");

// Register new user
exports.register = asyncHandler(async (req, res, next) => {
  // Call service to handle business logic
  const authResponse = await authService.register(req.body);

  // Return response
  res.status(STATUS_CODES.OK).json({
    statusCode: STATUS_CODES.OK,
    ...authResponse,
  });
});

// Login user
exports.login = asyncHandler(async (req, res, next) => {
  // Call service to handle business logic
  const authResponse = await authService.login(req.body);

  // Return response
  res.status(STATUS_CODES.OK).json({
    statusCode: STATUS_CODES.OK,
    ...authResponse,
  });
});
