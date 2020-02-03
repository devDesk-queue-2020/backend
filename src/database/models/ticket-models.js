const db = require("../dbConfig");

module.exports = {
  getAllTickets
};

function getAllTickets() {
  return db("tickets");
}
