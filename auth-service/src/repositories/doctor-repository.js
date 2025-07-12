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
}

module.exports = DoctorRepository;
