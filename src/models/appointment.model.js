const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Define City Schema
const CitySchema = new Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
});
// Define State Schema
const StateSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
});
// Define Appointment Schema
const AppointmentSchema = new Schema({
  appointmentId: {
    type: String,
    required: true,
    unique: true
  },
  appointmentDate: {
    type: Date,
    required: true
  },
  appointmentNumber: {
    type: String,
    required: true
  },
  doctorName: {
    type: String,
    required: true
  },
  doctorType: {
    type: String,
    required: true
  },
  doctorRating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  doctorExperience: {
    type: Number,
    min: 0,
    default: 0
  },
  clinicName: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  pincode: {
    type: String,
    required: true
  },
  city: {
    type: CitySchema,
    required: true
  },
  state: {
    type: StateSchema,
    required: true
  },
  patientName: {
    type: String,
    required: true
  },
  patientContact: {
    type: String,
    required: true
  },
  appointmentStatus: {
    type: String,
    enum: ['Confirmed', 'Pending', 'Rescheduled', 'Cancelled', 'Completed'],
    default: 'Pending'
  },
  fee: {
    type: Number,
    required: true
  },
  insuranceCovered: {
    type: Boolean,
    default: false
  },
  followUp: {
    type: Boolean,
    default: false
  },
  rememberMe: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true // Adds createdAt and updatedAt timestamps
});
// Add custom methods if needed
AppointmentSchema.methods.isUpcoming = function() {
  return new Date(this.appointmentDate) > new Date();
};
// Add static methods if needed
AppointmentSchema.statics.findByDoctorType = function(doctorType) {
  return this.find({ doctorType: doctorType });
};
// Create and export the model
const Appointment = mongoose.model('Appointment', AppointmentSchema);
module.exports = Appointment;