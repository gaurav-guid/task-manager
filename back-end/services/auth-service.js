const { User } = require("../db/initialize");
const jwt = require("jsonwebtoken");
const environment = require("./env-service");

exports.login = async ({ email, password }) => {
  // DEBT: salting & hashing
  const user = await User.findOne({ email: email, password: password });
  if (user) {
    return generateToken(user);
  } else {
    throw new Error("Invalid credentials");
  }
};

function generateToken(user) {
  const payload = { email: user.email, name: user.name };
  const options = { expiresIn: "1m" };

  return jwt.sign(payload, environment.jwtSecretSigningKey, options);
}
