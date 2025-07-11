const { User } = require("../models");
const CrudRepository = require("./crud-repository");

class UserRepository extends CrudRepository {
  constructor() {
    super(User);
  }

  async findByEmail(email) {
    return await User.findOne({ where: { email } });
  }
}

module.exports = UserRepository;
