const db = require("../dbConfig");

module.exports = {
  getAllComments,
  getCommentById,
  addNewComment
};

// ---------------- GET ---------------- //

function getAllComments() {
  return db("comments")
    .join("users", "comments.author_id", "users.id")
    .select(
      "comments.id",
      "comments.content",
      "users.username as author.id",
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
      "users.username as author.id",
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
      "users.username as author.id",
      "comments.ticket_id",
      "comments.created_by"
    )
    .where("comment_id", "=", id)
    .first();
}

// ---------------- UPDATE ---------------- //

// ---------------- DELETE ---------------- //
