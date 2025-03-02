const  hospitalService = require('../services/hospital.service');
const STATUS_CODES = require('../utils/statusCodes');

exports.getTopHospitals = async (req,res)=>{
    try{

        const topHospital = await hospitalService.getTopHospitals();

        const topHospitalData = await topHospital.map(data=>({
            id:data._id,
            name:data.name,
            hospitalType:data.hospitalType,
            experience:data.experience,
            rating:data.rating,
            address:data.address,
            contactNumber:data.contactNumber,
            isLike:data.isLike,
        }));

        res.status(STATUS_CODES.OK).json({
            statusCode:res.statusCode,
            data:topHospitalData
        });


    }catch(error){
        res.status().json({
            statusCode:STATUS_CODES.INTERNAL_SERVER_ERROR,
            message:error.message,
            error:error
        });
    }
};

