const doctorCategory = require('../models/doctorCategory.model');
const ErrorResponse = require('../utils/errorResponse');
const STATUS_CODES = require('../utils/statusCodes');

exports.getAllCategories = async ()=>{
    try{
        return await doctorCategory.find();
    }catch (error){
        throw new ErrorResponse(error.message,STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
};