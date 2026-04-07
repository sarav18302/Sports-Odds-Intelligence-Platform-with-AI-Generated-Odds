require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 5000,
  DB_URL: process.env.DATABASE_URL,
  PYTHON_SERVICE_URL: process.env.PYTHON_SERVICE_URL,
  JWT_SECRET: process.env.JWT_SECRET,
};