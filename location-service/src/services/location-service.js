const AppError = require("../utils/errors/app-error");
const { Enums } = require("../utils/common");
const { BaseError } = require("sequelize");
const { Messages } = require("../utils/common");
const { Country, State, City, Area, Pincode } = require("../models");
const { STATUS_CODE } = Enums;

class LocationService {
    async resolveLocations({ countryIds = [], stateIds = [], cityIds = [], areaIds = [], pincodeIds = [] }) {
        try {
            this.validateIds(countryIds, stateIds, cityIds, areaIds, pincodeIds);

            const [countries, states, cities, areas, pincodes] = await Promise.all([
                this.fetchLocations(Country, countryIds),
                this.fetchLocations(State, stateIds),
                this.fetchLocations(City, cityIds),
                this.fetchLocations(Area, areaIds),
                this.fetchLocations(Pincode, pincodeIds)
            ]);

            return {
                countries: this.cleanLocationData(countries),
                states: this.cleanLocationData(states),
                cities: this.cleanLocationData(cities),
                areas: this.cleanLocationData(areas),
                pincodes: this.cleanLocationData(pincodes)
            };
        } catch (error) {
            this.handleError(error);
        }
    }

    async fetchLocations(model, ids) {
        if (!ids?.length) return [];
        return await model.findAll({
            where: { id: ids },
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });
    }

    cleanLocationData(locations) {
        return locations.map(location => location.get({ plain: true }));
    }

    validateIds(...idArrays) {
        idArrays.forEach(ids => {
            if (ids && !Array.isArray(ids)) {
                throw new AppError('Location IDs must be provided as arrays', STATUS_CODE.BAD_REQUEST);
            }
        });
    }

    handleError(error) {
        console.error("Location Service Error:", error);

        if (error instanceof AppError) throw error;
        if (error instanceof BaseError) {
            throw new AppError(
                error.errors?.[0]?.message || error.message || Messages.SOMETHING_WRONG,
                STATUS_CODE.BAD_REQUEST
            );
        }
        throw new AppError(Messages.SOMETHING_WRONG, STATUS_CODE.INTERNAL_SERVER_ERROR);
    }
}

module.exports = new LocationService();