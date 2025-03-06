const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const hospitalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    hospitalType: {
      type: String,
      required: true,
      trim: true,
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
    likedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    longitude: {
      type: Number,
      required: true,
    },
    distance: {
      type: Number,
      default: 0,
    },
    openHours: {
      openTime: {
        type: String,
      },
      closeTime: {
        type: String,
      },
    },
    website: {
      type: String,
    },
    treatments: {
      type: [String],
      default: null,
    },
    doctors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
      },
    ],
    gallery: {
      type: [String],
      default: null,
    },
    reviews: [reviewSchema],
    contactNumber: {
      type: String,
      required: true,
      trim: true,
    },
    isLiked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Hospital = mongoose.model("Hospital", hospitalSchema);

module.exports = Hospital;
