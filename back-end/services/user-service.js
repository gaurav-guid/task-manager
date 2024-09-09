const { User } = require("../db/initialize");
const cryptoService = require("./crypto-service");

exports.userExists = async (email) => {
  const user = await User.exists({ email: email });

  if (user) {
    return true;
  } else {
    return false;
  }
};

exports.createUser = async ({ name, email, password }) => {
  if (await this.userExists(email)) {
    throw new Error("User already exists");
  }

  const passwordHash = cryptoService.saltAndHash(password);
  const user = await User.create({ name, email, password: passwordHash });

  if (user) {
    return { ...user.toObject(), _id: null, __v: null, password: null };
  } else {
    throw new Error("Unable to create user");
  }
};
