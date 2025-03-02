const doctorCategoryService = require('../services/doctorCategory.service');
const STATUS_CODES = require('../utils/statusCodes');

exports.getCategory = async (req, res) => {
    try {
        const categories = await doctorCategoryService.getAllCategories();

        const formattedCategories = categories.map(category => ({
            id: category._id, 
            name: category.name
        }));

        res.status(STATUS_CODES.OK).json({
            data: formattedCategories,
            statusCode: res.statusCode
        });
    } catch (error) {
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR,
            message: `${error.message}`,
            error: error
        });
    }
};
