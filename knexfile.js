// Update with your config settings.
const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./src/database/app_data_tables.db3"
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./src/database/migrations"
    },
    seeds: {
      directory: "./src/database/seeds"
    }
  },
  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: "./src/database/migrations"
    },
    seeds: { directory: "./src/database/seeds" }
  },
  testing: {
    client: "sqlite3",
    connection: {
      filename: "./src/database/testing_app_data_tables.db3"
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./src/database/migrations"
    },
    seeds: {
      directory: "./src/database/seeds"
    }
  }
};
