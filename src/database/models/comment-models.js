const db = require("../dbConfig");

module.exports = {
  getAllComments,
  getCommentById,
  addNewComment
};

// ---------------- GET ---------------- //

function getAllComments() {
  return db("comments");
}

function getCommentById(id) {
  return db("comments")
    .where({ id })
    .first();
}

// ---------------- POST ---------------- //

async function addNewComment(comment) {
  const [id] = await db("comments").insert(comment);
  return db("comments")
    .where({ id })
    .first();
}
