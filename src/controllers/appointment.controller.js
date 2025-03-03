const appointmentService = require('../services/appointment.service');
const STATUS_CODES = require('../utils/statusCodes');

exports.getUpcomingAppointments = async (req, res) => {
    try {
        // Read parameters from request body instead of query
        const { 
            limit = 10, 
            sortBy = 'appointmentDate', 
            order = 'asc', 
            filters = {} 
        } = req.body;

        // Allow filtering by doctorType if provided
        if (req.body.doctorType) {
            filters.doctorType = req.body.doctorType;
        }

        // Create options object
        const options = { limit, sortBy, order, filters };

        // Call the service method
        const appointments = await appointmentService.getUpcomingAppointments(options);

        // Map the response to include necessary fields
        const appointmentData = appointments.map(appointment => ({
            id: appointment._id,
            appointmentId: appointment.appointmentId,
            appointmentDate: appointment.appointmentDate,
            appointmentNumber: appointment.appointmentNumber,
            doctorName: appointment.doctorName,
            doctorType: appointment.doctorType,
            clinicName: appointment.clinicName,
            patientName: appointment.patientName,
            appointmentStatus: appointment.appointmentStatus,
            fee: appointment.fee,
            insuranceCovered: appointment.insuranceCovered
        }));

        // Send response
        res.status(STATUS_CODES.OK).json({
            statusCode: res.statusCode,
            count: appointmentData.length,
            data: appointmentData
        });
    } catch (error) {
        res.status(error.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            statusCode: error.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR,
            message: error.message || 'Error retrieving upcoming appointments',
        });
    }
};
