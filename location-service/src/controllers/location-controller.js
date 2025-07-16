const { LocationService } = require("../services");
const { SuccessResponse, ErrorResponse, Enums } = require("../utils/common");

const { STATUS_CODE } = Enums;

class LocationController {
    async resolveLocations(req, res) {
        console.log("location => ", req.body);
        try {
            const resolved = await LocationService.resolveLocations(req.body);
            SuccessResponse.data = resolved;
            return res.status(STATUS_CODE.OK).json(SuccessResponse);
        } catch (error) {
            ErrorResponse.message = error.message;
            return res
                .status(error.statusCode || STATUS_CODE.INTERNAL_SERVER_ERROR)
                .json(ErrorResponse);
        }
    }

}

module.exports = new LocationController();
