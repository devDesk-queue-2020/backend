exports.up = function(knex) {
  return knex.schema
    .createTable("users", users => {
      users.increments();
      users.text("first_name", 128).notNullable();
      users.text("last_name", 128).notNullable();
      users
        .text("username", 128)
        .unique()
        .notNullable();
      users
        .text("email")
        .unique()
        .notNullable();
      users.text("password").notNullable();
      users.enum("role", ["Student", "Helper"]).notNullable();
    })
    .createTable("categories", categories => {
      categories.increments();
      categories.text("category_name").notNullable();
    })
    .createTable("tickets", tickets => {
      tickets.increments();
      tickets.text("title").notNullable();
      tickets.text("content").notNullable();
      tickets.timestamp("created_by").defaultTo(knex.fn.now());
      tickets.enum("status", ["Open", "Processing", "Closed"]).notNullable();
      tickets
        .integer("category_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("categories")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tickets
        .integer("student_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tickets
        .integer("helper_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("comments", comments => {
      comments.increments();
      comments.text("content").notNullable();
      comments
        .integer("author_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      comments
        .integer("ticket_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("tickets")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      comments.timestamp("created_by").defaultTo(knex.fn.now());
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("comments")
    .dropTableIfExists("tickets")
    .dropTableIfExists("categories")
    .dropTableIfExists("users");
};
