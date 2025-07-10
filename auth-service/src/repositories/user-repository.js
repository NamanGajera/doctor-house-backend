const { Enums } = require("../utils/common");
const { User } = require("../models");
const CrudRepository = require("./crud-repository");

const { STATUS_CODE } = Enums;

class UserRepository extends CrudRepository {
  constructor() {
    super(User);
  }

  async findByEmail(email) {
    return await User.findOne({ where: { email } });
  }
}

module.exports = UserRepository;
