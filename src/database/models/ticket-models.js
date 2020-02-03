const db = require("../dbConfig");

module.exports = {
  getAllTickets,
  getTicketById,
  getTicketByCategory
};

function getAllTickets() {
  return db("tickets");
}

function getTicketById(id) {
  return db("tickets").where({ id });
}

function getTicketByCategory(category) {
  return db("tickets").where({ category_id: category });
}
