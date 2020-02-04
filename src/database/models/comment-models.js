const db = require("../dbConfig");

module.exports = {
  getAllComments,
  getCommentById,
  addNewComment,
  updateComment,
  deleteById
};

// ---------------- GET ---------------- //

function getAllComments() {
  return db("comments")
    .join("users", "comments.author_id", "users.id")
    .select(
      "comments.id",
      "comments.content",
      "users.username as author_id",
      "comments.ticket_id",
      "comments.created_by"
    );
}

function getCommentById(id) {
  return db("comments")
    .join("users", "comments.author_id", "users.id")
    .select(
      "comments.id as comment_id",
      "comments.content",
      "users.username as author_id",
      "comments.ticket_id",
      "comments.created_by"
    )
    .where("comment_id", "=", id)
    .first();
}

// ---------------- INSERT ---------------- //

async function addNewComment(comment) {
  const [id] = await db("comments").insert(comment);

  return db("comments")
    .join("users", "comments.author_id", "users.id")
    .select(
      "comments.id as comment_id",
      "comments.content",
      "users.username as author_id",
      "comments.ticket_id",
      "comments.created_by"
    )
    .where("comments.id", "=", id)
    .first();
}

// ---------------- UPDATE ---------------- //

async function updateComment(id, changes) {
  const sucess = await db("comments")
    .where({ id })
    .update(changes);
  return db("comments")
    .join("users", "comments.author_id", "users.id")
    .select(
      "comments.id as comment_id",
      "comments.content",
      "users.username as author_id",
      "comments.ticket_id",
      "comments.created_by"
    )
    .where("comment_id", "=", id)
    .first();
}

// ---------------- DELETE ---------------- //

function deleteById(id) {
  return db("comments")
    .where({ id })
    .del();
}
