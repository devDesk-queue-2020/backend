// Update with your config settings.

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./data/database/users"
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./data/database/migrations"
    },
    seeds: {
      directory: "./data/database/seeds"
    }
  },
  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: "./data/database/migrations"
    },
    seeds: { directory: "./data/database/seeds" }
  },

  testing: {
    client: "sqlite3",
    connection: {
      filename: "./data/database/testing-users"
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./data/database/migrations"
    },
    seeds: {
      directory: "./data/database/seeds"
    }
  }
};
