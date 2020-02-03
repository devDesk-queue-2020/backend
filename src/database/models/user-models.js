const db = require("../dbConfig");


function getAllUsers() {
  return db('users')
}

function findUserById(id) {
  return db('users')
    .where({ id })
    .first();
}

function findUserBy(filter) {
  return db('users')
    .where(filter);
}

function addUser(user) {
  return db('users')
    .insert(user)
}

function deleteUser(id) {
  return db('users')
  .where({ id })
  .first()
  .del()
}

function updateUser(id, changes) {
  return db("users")
    .where({ id })
    .update(changes);
}

module.exports = {
  getAllUsers,
  addUser,
  findUserBy,
  findUserById,
  deleteUser,
  updateUser
};

