const { Patient } = require("../models");
const CrudRepository = require("./crud-repository");

class PatientRepository extends CrudRepository {
  constructor() {
    super(Patient);
  }

  async createPatient(data, transaction) {
    const response = await Patient.create(data, { transaction: transaction });
    return response;
  }
}

module.exports = PatientRepository;
