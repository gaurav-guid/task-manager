const { User } = require("../db/initialize");

exports.userExists = async (email) => {
  const user = await User.exists({ email: email });

  console.log(user);
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

  const user = await User.create({ name, email, password });

  if (user) {
    return user;
  } else {
    throw new Error("Unable to create user");
  }
};
