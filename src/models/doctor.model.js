const mongoose = require("mongoose");

const timeSlotSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  availableSlots: [
    {
      startTime: {
        type: String,
        required: true,
        // Format: HH:MM (24-hour format)
        match: /^([01]\d|2[0-3]):([0-5]\d)$/,
      },
      endTime: {
        type: String,
        required: true,
        // Format: HH:MM (24-hour format)
        match: /^([01]\d|2[0-3]):([0-5]\d)$/,
      },
      isBooked: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

const workingHoursSchema = new mongoose.Schema({
  day: {
    type: String,
    enum: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    required: true,
  },
  startTime: {
    type: String,
    required: true,
    match: /^([01]\d|2[0-3]):([0-5]\d)$/,
  },
  endTime: {
    type: String,
    required: true,
    match: /^([01]\d|2[0-3]):([0-5]\d)$/,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
});

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    doctorType: {
      type: String,
      default: null,
    },
    experience: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },
    city: {
      cityId: {
        type: Number,
        required: true,
      },
      name: {
        type: String,
        required: true,
        trim: true,
      },
    },
    state: {
      stateId: {
        type: Number,
        required: true,
      },
      name: {
        type: String,
        required: true,
        trim: true,
      },
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    isLiked: {
      type: Boolean,
      default: false,
    },
    likedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        index: true,
      },
    ],
    about: {
      type: String,
      trim: true,
      maxlength: 1000, // Optional: limit description length
    },
    qualifications: [
      {
        degree: {
          type: String,
          trim: true,
        },
        institution: {
          type: String,
          trim: true,
        },
        year: {
          type: Number,
        },
      },
    ],
    specializations: {
      type: Array,
      default: [],
    },
    workingHours: [workingHoursSchema],
    timeSlots: [timeSlotSchema],
    hospitalId: {
      type: String,
      default: null,
    },
    categoryId: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;
