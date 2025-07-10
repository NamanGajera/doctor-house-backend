const AuthService = require("../services/auth-service");

exports.register = async (req, res) => {
  try {
    const response = await AuthService.register(req.body);
    res.status(response.status).json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const response = await AuthService.login(req.body);
    res.status(response.status).json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
