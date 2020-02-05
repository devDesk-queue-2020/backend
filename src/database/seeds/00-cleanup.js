const cleaner = require("knex-cleaner");

exports.seed = function(knex) {
  let tables = ["users", "tickets", "comments", "categories"];
  tables.forEach(function(table) {
    knex(table).truncate();
  });
  return cleaner.clean(knex, {
    ignoreTables: ["knex_migrations", "knex_migrations_lock"] // don't empty migration tables
  });
};
