const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { GENDER } = require("../utils/enums");

const userSchema = new mongoose.Schema(
  {
    // Core Authentication Fields
    name: {
      type: String,
      required: function () {
        // Only require name during initial user registration
        return this.isNew && !this.isPartialUpdate;
      },
    },
    email: {
      type: String,
      required: function () {
        // Only require email during initial user registration
        return this.isNew && !this.isPartialUpdate;
      },
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: function () {
        // Only require password during initial user registration
        return this.isNew && !this.isPartialUpdate;
      },
      minlength: [6, "Password should be at least 6 characters"],
      select: false,
    },

    // Rest of the schema remains the same...
    profile: {
      firstName: {
        type: String,
        trim: true,
      },
      lastName: {
        type: String,
        trim: true,
      },
      gender: {
        type: String,
        enum: Object.values(GENDER),
      },
      dateOfBirth: {
        type: Date,
      },
      profileImage: {
        url: String,
        publicId: String,
      },
      phoneNumber: {
        type: String,
        validate: {
          validator: function (v) {
            return /^[+]?[\d\s()-]{10,15}$/.test(v);
          },
          message: (props) => `${props.value} is not a valid phone number!`,
        },
      },
    },

    // Existing other fields...
  },
  {
    timestamps: true,
  }
);

// Modify the pre-save middleware to skip validation for partial updates
userSchema.pre("save", function (next) {
  if (this.isPartialUpdate) {
    this.validateSync(Object.keys(this.$__.updateKeys || {}));
  }
  next();
});

// Add a method to perform partial updates
userSchema.methods.partialUpdate = function (updateData) {
  // Mark this as a partial update to skip validation
  this.isPartialUpdate = true;

  // Update only the provided fields
  Object.keys(updateData).forEach((key) => {
    // Prevent overwriting core authentication fields
    if (!["name", "email", "password"].includes(key)) {
      this.set(key, updateData[key]);
    }
  });

  return this.save();
};

// Existing methods and statics...

const User = mongoose.model("User", userSchema);

module.exports = User;
