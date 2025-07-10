const { AuthService } = require("../services");

async function register(req, res) {
  try {
    const user = await AuthService.register(req.body);
    res.status(201).json({ message: "User created", data: user });
  } catch (error) {
    console.log("Error", error);
    res.status(400).json({ error: error.message });
  }
}

async function login(req, res) {
  try {
    const user = await AuthService.login(req.body);
    res.status(200).json({ message: "Login successful", data: user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  login,
  register,
};
