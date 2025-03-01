const Joi = require('joi');

// User registration validation schema
const registerSchema = Joi.object({
  name: Joi.string().min(2).max(50).required()
    .messages({
      'string.empty': 'Name is required',
      'string.min': 'Name must be at least 2 characters long',
      'string.max': 'Name cannot exceed 50 characters'
    }),
  email: Joi.string().email().required()
    .messages({
      'string.empty': 'Email is required',
      'string.email': 'Please provide a valid email'
    }),
  password: Joi.string().min(6).required()
    .messages({
      'string.empty': 'Password is required',
      'string.min': 'Password must be at least 6 characters long'
    }),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required()
    .messages({
      'any.only': 'Passwords do not match',
      'string.empty': 'Please confirm your password'
    })
});

// User login validation schema
const loginSchema = Joi.object({
  email: Joi.string().email().required().label('Email')// Add label to show custom field name
    .messages({
      'string.empty': 'Email is required',
      'string.email': 'Please provide a valid email'
    }),
  password: Joi.string().required() .label('Password')// Add label
    .messages({
      'string.empty': 'Password is required'
    })
});


// Password reset request validation schema
const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().required()
    .messages({
      'string.empty': 'Email is required',
      'string.email': 'Please provide a valid email'
    })
});

// Password reset validation schema
const resetPasswordSchema = Joi.object({
  password: Joi.string().min(6).required()
    .messages({
      'string.empty': 'Password is required',
      'string.min': 'Password must be at least 6 characters long'
    }),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required()
    .messages({
      'any.only': 'Passwords do not match',
      'string.empty': 'Please confirm your password'
    }),
  token: Joi.string().required()
    .messages({
      'string.empty': 'Reset token is required'
    })
});

module.exports = {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema
};