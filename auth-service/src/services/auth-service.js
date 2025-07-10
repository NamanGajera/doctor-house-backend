const bcrypt = require("bcryptjs");
const { UserRepository } = require("../repositories");

const userRepository = new UserRepository();

async function register(data) {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  return await userRepository.create({ ...data, password: hashedPassword });
}

async function login(data) {
  const user = await userRepository.findByEmail(data.email);
  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(data.password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  return user;
}

module.exports = {
  login,
  register,
};
