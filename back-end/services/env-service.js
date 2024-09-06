const environment = process.env.NODE_ENV;
const initializeDB = process.env.TASK_MANAGER_INITIALIZE_DB;
const port = process.env.TASK_MANAGER_PORT || 3000;
const jwtSecretSigningKey =
  process.env.TASK_MANAGER_JWT_SECRET_KEY || "secretKey";

module.exports = { environment, initializeDB, port, jwtSecretSigningKey };
