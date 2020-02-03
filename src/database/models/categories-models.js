const db = require("../dbConfig");

module.exports = {
  getAllCategories,
  getCategoryById,
  addNewCategory
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

// ---------------- POST ---------------- //

async function addNewCategory(category_name) {
  const [id] = await db("categories").insert(category_name);
  return db("categories")
    .where({ id })
    .first();
}
