const doctor = require('../models/doctor.model');
const ErrorResponse = require('../utils/errorResponse');
const STATUS_CODES = require('../utils/statusCodes');

exports.getTopDoctors = async ()=>{
    try{
        return await doctor.find({ rating: { $gt: 4.4 } });     
    }catch(error){
        throw new ErrorResponse(error.message,STATUS_CODES.BAD_REQUEST);
    }
};