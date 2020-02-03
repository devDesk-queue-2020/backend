// Update with your config settings.

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./data/users"
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./data/database/migrations"
    },
    seeds: {
      directory: "./data/database/seeds"
    }
  },

  testing: {
    client: "sqlite3",
    connection: {
      filename: "./data/testing-users"
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
