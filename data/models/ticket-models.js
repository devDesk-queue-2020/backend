const db = require("../database/dbConfig");

module.exports = {
  getAllTickets
};

function getAllTickets() {
  return db("tickets");
}
