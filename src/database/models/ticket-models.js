const db = require("../dbConfig");

module.exports = {
  getAllTickets,
  getTicketById,
  getTicketByCategory,
  addNewTicket
};

// ---------------- GET ---------------- //

function getAllTickets() {
  return db("tickets");
}

function getTicketById(id) {
  return db("tickets").where({ id });
}

function getTicketByCategory(category) {
  return db("tickets").where({ category_id: category });
}

// ---------------- POST ---------------- //

function addNewTicket(ticket) {
  return db("tickets").insert(ticket);
}
