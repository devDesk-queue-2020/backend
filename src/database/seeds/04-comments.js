exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("comments")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("comments").insert([
        { content: "I am a comment", author_id: 2, ticket_id: 1 },
        { content: "I am a comment", author_id: 2, ticket_id: 1 },
        { content: "I am a comment", author_id: 2, ticket_id: 1 }
      ]);
    });
};
