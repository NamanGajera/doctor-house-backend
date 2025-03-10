const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { GENDER } = require("../utils/enums");

const userSchema = new mongoose.Schema(
  {
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

    // Consent field addition
    hasAcceptedConsent: {
      type: Boolean,
      default: false,
    },

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

    // Password Reset Fields
    resetPasswordToken: String,
    resetPasswordExpire: Date,

    // User Role
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

// Password encryption middleware - Add this FIRST
userSchema.pre("save", async function (next) {
  // Only hash the password if it's modified (or new)
  if (!this.isModified("password")) {
    return next();
  }

  // Generate salt
  const salt = await bcrypt.genSalt(10);

  // Hash password with salt
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

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

// Method to update consent status
userSchema.methods.updateConsent = function (hasAccepted) {
  this.hasAcceptedConsent = hasAccepted;
  return this.save();
};

// Method to check if entered password matches with stored hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
