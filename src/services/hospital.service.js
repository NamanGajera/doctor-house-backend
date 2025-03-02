const hospital = require('../models/hospital.model');
const ErrorResponse = require('../utils/errorResponse');
const STATUS_CODES = require('../utils/statusCodes');

exports.getTopHospitals = async ()=>{
    try{
        return await hospital.find({rating:{$gt:4.6}});
    }catch(error){
        throw new ErrorResponse(error.message,STATUS_CODES.BAD_REQUEST);
    }
};