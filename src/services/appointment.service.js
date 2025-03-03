// services/appointment.service.js
const Appointment = require("../models/appointment.model");
const ErrorResponse = require("../utils/errorResponse");
const STATUS_CODES = require("../utils/statusCodes");

exports.getUpcomingAppointments = async (options = {}) => {
  try {
    const { 
      limit = 10, 
      sortBy = 'appointmentDate', 
      order = 'asc',
      filters = {}
    } = options;
    
    const currentDateTime = new Date(); // Get the current date and time
    console.log("Current Date Time:", currentDateTime);

    // Construct the query
    const query = {
      ...filters
    };

    // Add a condition to compare appointmentDate (stored as string) with currentDateTime
    query.$expr = {
      $gte: [
        { $toDate: "$appointmentDate" }, // Convert appointmentDate string to Date
        currentDateTime // Compare with current date and time
      ]
    };

    console.log("Query:", query);

    // Determine sort direction (ascending order ensures nearest appointments come first)
    const sortDirection = order === 'desc' ? -1 : 1;

    // Fetch the next 10 appointments
    const appointments = await Appointment.find(query)
      .sort({ [sortBy]: sortDirection }) // Sort by appointmentDate ascending
      .limit(limit); // Limit to 10 records

    console.log("Appointments:", appointments);
    return appointments;

  } catch (error) {
    console.error("Error fetching upcoming appointments:", error);
    throw new ErrorResponse(
      `Error fetching upcoming appointments: ${error.message}`, 
      error.statusCode || STATUS_CODES.BAD_REQUEST
    );
  }
};
