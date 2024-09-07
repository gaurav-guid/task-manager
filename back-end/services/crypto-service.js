const crypto = require("crypto");

exports.saltAndHash = (password) => {
  const salt = crypto.randomBytes(16).toString("hex");
  return (
    salt + crypto.pbkdf2Sync(password, salt, 10, 64, "sha512").toString("hex")
  );
};

exports.validatePassword = (password, hash) => {
  const salt = hash.slice(0, 32);
  const hashedPassword = crypto
    .pbkdf2Sync(password, salt, 10, 64, "sha512")
    .toString("hex");
  return salt + hashedPassword === hash;
};
