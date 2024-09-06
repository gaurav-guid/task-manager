const userService = require("../services/user-service");
const authService = require("../services/auth-service");

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await userService.userExists(email);
    if (userExists) {
      res.status(409).json("User already exists.");
      return;
    }

    const user = await userService.createUser({ name, email, password });
    res.status(201).json({ user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const jwt = await authService.login({ email, password });
    res.status(200).json({ jwt });
  } catch (err) {
    res.status(401).json({ error: "Invalid credentials" });
  }
};
