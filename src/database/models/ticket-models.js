const db = require("../dbConfig");

module.exports = {
  getAllTickets,
  getTicketById,
  getTicketsByStudent,
  getTicketsByCategory,
  addNewTicket,
  updateTicket,
  deleteById,
  updateTicketStatus
};

// ---------------- GET ---------------- //

function getAllTickets() {
  return db("tickets")
    .join("users", function() {
      this.on("users.id", "tickets.student_id").orOn(
        "users.id",
        "tickets.helper_id"
      );
    })
    .join("categories", "categories.id", "tickets.category_id")
    .select(
      "tickets.id",
      "tickets.title",
      "tickets.content",
      "tickets.created_by",
      "tickets.status",
      "users.username",
      "categories.category_name"
    );
}

function getTicketById(id) {
  return db("tickets")
    .join("users", function() {
      this.on("users.id", "tickets.student_id").orOn(
        "users.id",
        "tickets.helper_id"
      );
    })
    .join("categories", "categories.id", "tickets.category_id")
    .select(
      "tickets.id as ticket_id",
      "tickets.title",
      "tickets.content",
      "tickets.created_by",
      "tickets.status",
      "users.username",
      "categories.category_name"
    )
    .where("ticket_id", "=", id)
    .first();
}

function getTicketsByStudent(student_id) {
  return db("tickets")
    .join("users", function() {
      this.on("users.id", "tickets.student_id").orOn(
        "users.id",
        "tickets.helper_id"
      );
    })
    .join("categories", "categories.id", "tickets.category_id")
    .select(
      "tickets.id as ticket_id",
      "tickets.title",
      "tickets.content",
      "tickets.created_by",
      "tickets.status",
      "users.username",
      "categories.category_name"
    )
    .where("users.id", "=", student_id);
}

function getTicketsByCategory(category) {
  return db("tickets")
    .join("users", function() {
      this.on("users.id", "tickets.student_id").orOn(
        "users.id",
        "tickets.helper_id"
      );
    })
    .join("categories", "categories.id", "tickets.category_id")
    .select(
      "tickets.id as ticket_id",
      "tickets.title",
      "tickets.content",
      "tickets.created_by",
      "tickets.status",
      "users.username",
      "categories.category_name"
    )
    .where("category_name", "=", category);
}

// ---------------- INSERT ---------------- //

async function addNewTicket(ticket) {
  const [id] = await db("tickets").insert(ticket, "id");
  return db("tickets")
    .join("users", function() {
      this.on("users.id", "tickets.student_id").orOn(
        "users.id",
        "tickets.helper_id"
      );
    })
    .join("categories", "categories.id", "tickets.category_id")
    .select(
      "tickets.id as ticket_id",
      "tickets.title",
      "tickets.content",
      "tickets.created_by",
      "tickets.status",
      "users.username",
      "categories.category_name"
    )
    .where("ticket_id", "=", id)
    .first();
}

// ---------------- UPDATE ---------------- //

async function updateTicket(id, ticket) {
  const success = await db("tickets")
    .where({ id })
    .update(ticket);
  return db("tickets")
    .join("users", function() {
      this.on("users.id", "tickets.student_id").orOn(
        "users.id",
        "tickets.helper_id"
      );
    })
    .join("categories", "categories.id", "tickets.category_id")
    .select(
      "tickets.id as ticket_id",
      "tickets.title",
      "tickets.content",
      "tickets.created_by",
      "tickets.status",
      "users.username",
      "categories.category_name"
    )
    .where("ticket_id", "=", id)
    .first();
}

function updateTicketStatus(id) {
  return db("ticket")
    .where({ id })
    .update({ status: "Processing" });
}

// ---------------- DELETE ---------------- //

function deleteById(id) {
  return db("tickets")
    .where({ id })
    .del();
}
