const { Doctor } = require("../models");
const CrudRepository = require("./crud-repository");

class DoctorRepository extends CrudRepository {
  constructor() {
    super(Doctor);
  }

  async createDoctor(data, transaction) {
    const response = await Doctor.create(data, { transaction: transaction });
    return response;
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
