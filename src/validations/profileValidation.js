const Joi = require("joi");
const { GENDER } = require("../utils/enums");

// Complete profile validation schema
exports.completeProfileSchema = Joi.object({
  firstName: Joi.string().trim().required().messages({
    "string.empty": "First name is required",
    "any.required": "First name is required",
  }),
  lastName: Joi.string().trim().required().messages({
    "string.empty": "Last name is required",
    "any.required": "Last name is required",
  }),
  gender: Joi.string()
    .valid(...Object.values(GENDER))
    .required()
    .messages({
      "string.empty": "Gender is required",
      "any.required": "Gender is required",
      "any.only":
        "Gender must be one of: male, female, other, prefer_not_to_say",
    }),
  mobileNumber: Joi.string()
    .pattern(/^[0-9]{10,15}$/)
    .required()
    .messages({
      "string.empty": "Mobile number is required",
      "string.pattern.base": "Mobile number must be between 10-15 digits",
      "any.required": "Mobile number is required",
    }),
  age: Joi.number().min(0).required().messages({
    "number.base": "Age must be a number",
    "number.min": "Age cannot be negative",
    "any.required": "Age is required",
  }),
});

// Update profile validation schema
exports.updateProfileSchema = Joi.object({
  firstName: Joi.string().trim().required().messages({
    "string.empty": "First name is required",
    "any.required": "First name is required",
  }),
  lastName: Joi.string().trim().required().messages({
    "string.empty": "Last name is required",
    "any.required": "Last name is required",
  }),
  name: Joi.string().trim().optional(),
  gender: Joi.string()
    .valid(...Object.values(GENDER))
    .required()
    .messages({
      "string.empty": "Gender is required",
      "any.required": "Gender is required",
      "any.only":
        "Gender must be one of: male, female, other, prefer_not_to_say",
    }),
  mobileNumber: Joi.string()
    .pattern(/^[0-9]{10,15}$/)
    .required()
    .messages({
      "string.empty": "Mobile number is required",
      "string.pattern.base": "Mobile number must be between 10-15 digits",
      "any.required": "Mobile number is required",
    }),
  age: Joi.number().min(0).required().messages({
    "number.base": "Age must be a number",
    "number.min": "Age cannot be negative",
    "any.required": "Age is required",
  }),
});
