exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("tickets")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("tickets").insert([
        {
          title: "Help me!!!",
          content: " I hate Redux, how does it work???",
          category_id: 5,
          student_id: 1
        },
        {
          title: "Why is my axios not working?",
          content: "It returns a 404 whats wrong",
          category_id: 3,
          student_id: 1
        },
        {
          title: "My props are not passing correctly, why?",
          content: "I run out of ideas for problems",
          category_id: 4,
          student_id: 1
        },
        {
          title: "My Routing doesnt work, whenever I try to hit Routes",
          content: "Did I maybe forget to wrap App in Router?",
          category_id: 4,
          student_id: 1
        }
      ]);
    });
};
