const doctor = require('../models/doctor.model');
const doctorCategory = require('../models/options.model');
const ErrorResponse = require('../utils/errorResponse');
const STATUS_CODES = require('../utils/statusCodes');

exports.getTopDoctors = async ()=>{
    try{
        return await doctor.find({ rating: { $gt: 4.4 } });     
    }catch(error){
        throw new ErrorResponse(error.message,STATUS_CODES.BAD_REQUEST);
    }
};

exports.getDoctorById = async (doctorId) => {
    try {
        const doctorDetails = await doctor.findById(doctorId);
        
        if (!doctorDetails) {
            throw new ErrorResponse('Doctor not found', STATUS_CODES.NOT_FOUND);
        }
        
        return doctorDetails;
    } catch(error) {
        throw new ErrorResponse(error.message, STATUS_CODES.BAD_REQUEST);
    }
};

exports.getAllCategories = async ()=>{
    try{
        return await doctorCategory.find();
    }catch (error){
        throw new ErrorResponse(error.message,STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
};