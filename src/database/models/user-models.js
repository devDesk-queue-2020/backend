const db = require("../dbConfig");

function getAllUsers() {
  return db("users");
}

function findUserById(id) {
  return db("users")
    .where({ id })
    .first();
}

function findUserBy(filter) {
  return db("users")
    .where(filter)
    .first();
}

function addUser(user) {
  return db("users").insert(user);
}

module.exports = {
  getAllUsers,
  addUser,
  findUserBy,
  findUserById
};
