const axios = require("axios");

const { Doctor, DoctorLikes, Specialization, sequelize } = require("../models");
const { Sequelize } = require("sequelize");
const CrudRepository = require("./crud-repository");

class DoctorRepository extends CrudRepository {
  constructor() {
    super(Doctor);
  }

  async createDoctor(data, transaction) {
    const response = await Doctor.create(data, { transaction: transaction });
    return response;
  }

  async findDoctor(id) {
    const response = await Doctor.findOne({
      where: {
        userId: id,
      },
      include: [
        {
          model: Specialization,
          as: "specialization",
          attributes: ["id", "name"],
          through: { attributes: [] },
        },
      ],
    });
    return response;
  }

  async findAllDoctors(userId, filter) {
    try {
      console.log("User Id ==>>> ", userId);

      if (!userId) {
        throw new Error("User ID is required");
      }

      const doctors = await Doctor.findAll({
        where: filter || {},
        include: [
          {
            model: DoctorLikes,
            where: { userId },
            required: false,
            attributes: [],
          },
          {
            model: Specialization,
            as: "specialization",
            attributes: ["id", "name"],
            through: { attributes: [] },
          },
        ],
        attributes: {
          include: [
            [
              Sequelize.literal(`
                        EXISTS (
                            SELECT 1
                            FROM DoctorLikes
                            WHERE DoctorLikes.doctorId = Doctor.userId
                            AND DoctorLikes.userId = ${sequelize.escape(userId)}
                        )
                        `),
              "isLiked",
            ],
          ],
        },
      });

      if (!doctors || doctors.length === 0) {
        return [];
      }

      // Extract all unique location IDs (filtering out null/undefined)
      const locationIds = {
        cityIds: [],
        stateIds: [],
        countryIds: [],
        areaIds: [],
        pincodeIds: []
      };

      doctors.forEach(doctor => {
        const doc = doctor.get({ plain: true });
        if (doc.cityId) locationIds.cityIds.push(doc.cityId);
        if (doc.stateId) locationIds.stateIds.push(doc.stateId);
        if (doc.countryId) locationIds.countryIds.push(doc.countryId);
        if (doc.areaId) locationIds.areaIds.push(doc.areaId);
        if (doc.pincodeId) locationIds.pincodeIds.push(doc.pincodeId);
      });

      // Remove duplicates
      Object.keys(locationIds).forEach(key => {
        locationIds[key] = [...new Set(locationIds[key])];
      });

      // Only call location service if we have any IDs
      let locationData = {
        cities: [],
        states: [],
        countries: [],
        areas: [],
        pincodes: []
      };

      const hasLocationIds = Object.values(locationIds).some(ids => ids.length > 0);

      if (hasLocationIds) {
        try {
          const locationRes = await axios.post(
            "http://location-service:5004/api/location/internal/resolve",
            locationIds
          );
          locationData = locationRes.data.data;
        } catch (error) {
          console.error("Error fetching location data:", error);
        }
      }

      // Create lookup maps
      const createMap = (items) =>
        Object.fromEntries((items || []).map(item => [item.id, item]));

      const cityMap = createMap(locationData.cities);
      const stateMap = createMap(locationData.states);
      const countryMap = createMap(locationData.countries);
      const areaMap = createMap(locationData.areas);
      const pincodeMap = createMap(locationData.pincodes);

      // Transform doctors with location data
      return doctors.map(doctor => {
        const doc = doctor.get({ plain: true });
        return {
          ...doc,
          isLiked: Boolean(doc.isLiked),
          city: doc.cityId ? cityMap[doc.cityId] || null : null,
          state: doc.stateId ? stateMap[doc.stateId] || null : null,
          country: doc.countryId ? countryMap[doc.countryId] || null : null,
          area: doc.areaId ? areaMap[doc.areaId] || null : null,
          pincode: doc.pincodeId ? pincodeMap[doc.pincodeId] || null : null,
        };
      });
    } catch (error) {
      console.error("Error in findAllDoctors:", error);
      throw error;
    }
  }
  createDoctorFromEvent = async ({ userId, fullName, email, phone }) => {
    return await Doctor.create({
      userId,
      fullName,
      email,
      phone,
    });
  };
}

module.exports = DoctorRepository;
