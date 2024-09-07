const { User } = require("../db/initialize");
const jwt = require("jsonwebtoken");
const environment = require("./env-service");
const userService = require("./user-service");
const cryptoService = require("./crypto-service");

exports.login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    console.log(`User with email ${email} not found`);
    throw new Error("Invalid credentials");
  }

  const passwordValid = cryptoService.validatePassword(password, user.password);

  if (!passwordValid) {
    console.log(`Incorrect password login attempt for user ${email}`);
    throw new Error("Invalid credentials");
  }

  return generateToken(user);
};

function generateToken(user) {
  const payload = { email: user.email, name: user.name };
  const options = { expiresIn: "1m" };

  return jwt.sign(payload, environment.jwtSecretSigningKey, options);
}
