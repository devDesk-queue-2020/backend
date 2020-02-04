const db = require("../dbConfig");

module.exports = {
  getAllTickets,
  getTicketById,
  getTicketByStudent,
  getTicketByCategory,
  addNewTicket
};

// ---------------- GET ---------------- //

function getAllTickets() {
  return db("tickets");
}

function getTicketById(id) {
  return db("tickets")
    .where({ id })
    .first();
}

function getTicketByStudent(id) {
  return db("tickets")
    .where({ student_id: id })
    .first();
}

function getTicketByCategory(category) {
  return db("tickets").where({ category_id: category });
}

// ---------------- POST ---------------- //

async function addNewTicket(ticket) {
  const [id] = await db("tickets").insert(ticket);
  return db("tickets")
    .where({ id })
    .first();
}
