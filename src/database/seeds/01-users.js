const bcryptjs = require("bcryptjs");

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        {
          first_name: "Amin",
          last_name: "Hasan",
          username: "amin",
          email: "amin@email.com",
          password: bcryptjs.hashSync("1234", 13),
          role: "Helper"
        },
        {
          first_name: "Emma",
          last_name: "Andrews",
          username: "emma",
          email: "emma@email.com",
          password: bcryptjs.hashSync("1234", 13),
          role: "Student"
        },
        {
          first_name: "Niklas",
          last_name: "Becker",
          username: "niklas",
          email: "nik@email",
          password: bcryptjs.hashSync("1234", 13),
          role: "Student"
        }
      ]);
    });
};
