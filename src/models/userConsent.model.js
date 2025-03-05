const mongoose = require("mongoose");
const { GENDER } = require("../utils/enums");

const userConsentSchema = new mongoose.Schema(
  {
    // Link to the original User
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Personal Details
    personalDetails: {
      firstName: {
        type: String,
        required: [true, "First Name is required"],
        trim: true,
      },
      lastName: {
        type: String,
        required: [true, "Last Name is required"],
        trim: true,
      },
      phoneNumber: {
        type: String,
        required: [true, "Phone Number is required"],
        validate: {
          validator: function (v) {
            return /^[+]?[\d\s()-]{10,15}$/.test(v);
          },
          message: (props) => `${props.value} is not a valid phone number!`,
        },
      },
      gender: {
        type: String,
        enum: Object.values(GENDER),
        required: [true, "Gender is required"],
      },
      age: {
        type: Number,
        required: [true, "Age is required"],
        min: [0, "Age must be a positive number"],
      },
    },

    // Medical Information
    medicalDetails: {
      bloodGroup: {
        type: String,
        enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      },
      allergies: [String],
      medicalConditions: [String],
      emergencyContact: {
        name: String,
        relationship: String,
        phoneNumber: String,
      },
    },

    // Profile Image
    profileImage: {
      url: String,
      publicId: String,
    },

    // Consent and Privacy Settings
    medicalConsent: {
      hasConsented: {
        type: Boolean,
        default: false,
      },
      consentDate: {
        type: Date,
        default: Date.now,
      },
      consentVersion: {
        type: String,
        default: "1.0",
      },
    },

    privacySettings: {
      dataSharing: {
        type: Boolean,
        default: false,
      },
      marketingCommunication: {
        type: Boolean,
        default: false,
      },
    },
  },
  {
    timestamps: true,
  }
);

const UserConsent = mongoose.model("UserConsent", userConsentSchema);

module.exports = UserConsent;
