const doctorService = require('../services/doctor.service');
const STATUS_CODES = require('../utils/statusCodes');

exports.getTopDoctors = async (req,res) => {
    try{
        const topDoctor = await doctorService.getTopDoctors();

        const topDoctorData = topDoctor.map(data=>({
            id:data._id,
            name:data.name,
            doctorType:data.doctorType,
            experience:data.experience,
            rating:data.rating,
            address:data.address,
            isLike:data.isLike,

        }));

        res.status(STATUS_CODES.OK).json({
            data: topDoctorData,
            statusCode:res.statusCode,
        });

    }catch(error){
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            statusCode:STATUS_CODES.INTERNAL_SERVER_ERROR,
            message:error.message,
            error:error
        });
    }
};