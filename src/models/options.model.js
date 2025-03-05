const mongoose = require('mongoose');

const doctorCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  id: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('DoctorCategory', doctorCategorySchema);