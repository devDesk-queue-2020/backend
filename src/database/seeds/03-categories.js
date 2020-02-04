exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("categories")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("categories").insert([
        { category_name: "HTML" },
        { category_name: "CSS" },
        { category_name: "JS" },
        { category_name: "React.js" },
        { category_name: "Redux" },
        { category_name: "Node.js" },
        { category_name: "Python" }
      ]);
    });
};
