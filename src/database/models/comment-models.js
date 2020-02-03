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

function addNewComment(comment) {
  return db("commentss").insert(comment);
}
