const { where } = require("sequelize");
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
    });
    return response;
  }

  async findAllDoctors(userId, filter) {
    console.log("User Id ==>>> ", userId);
    const doctors = await Doctor.findAll({
      where: filter,
      include: [
        {
          model: DoctorLikes,
          where: { userId },
          required: false,
          attributes: []
        },
        {
          model: Specialization,
          as: "specialization",
          attributes: ["id", "name"],
          through: { attributes: [] }
        }
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
            "isLiked"
          ]
        ]
      }
    });
    const updatedDoctors = doctors.map((doctor) => {
      const json = doctor.toJSON();
      return {
        ...json,
        isLiked: Boolean(json.isLiked),
      };
    });
    return updatedDoctors;
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
