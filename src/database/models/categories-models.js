const db = require("../dbConfig");

module.exports = {
  getAllCategories,
  getCategoryById,
  addNewCategory,
  deleteById
};

// ---------------- GET ---------------- //

function getAllCategories() {
  return db("categories");
}

function getCategoryById(id) {
  return db("categories")
    .where({ id })
    .first();
}

// ---------------- INSERT ---------------- //

async function addNewCategory(category_name) {
  const [id] = await db("categories").insert(category_name);
  return db("categories")
    .where({ id })
    .first();
}

// ---------------- DELETE ---------------- //

function deleteById(id) {
  return db("categories")
    .where({ id })
    .del();
}
