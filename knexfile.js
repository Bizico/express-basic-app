// Update with your config settings...
require("dotenv").config();

module.exports = {
  client: "pg",
  connection: {
    timezone: "UTC",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  },
  seeds: {
    directory: "./seeds"
  }
};
