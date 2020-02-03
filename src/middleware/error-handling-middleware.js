const Users = require("../models/user-models");
const Tickets = require("../models/ticket-models");

module.exports = {
  validateUsername,
  validateNewTicketBody,
  validateNewUserBody
};

function validateUsername(req, res, next) {
  Users.getAllUsers()
    .then(users => {
      let usernames = users.map(curr => curr.username);
      if (usernames.includes(req.body.username)) {
        next();
      } else {
        res.status(400).json(`This is an invalid username`);
      }
    })
    .catch(error => {
      res.status(400).json(`Error validating username`);
    });
}

function validateNewTicketBody(req, res, next) {
  if (
    req.body.title &&
    req.body.content &&
    req.body.status &&
    req.body.category_id &&
    req.body.student_id
  ) {
    next();
  } else if (
    !req.body.title ||
    !req.body.content ||
    !req.body.status ||
    !req.body.category_id ||
    !req.body.student_id
  ) {
    res
      .status(400)
      .json(
        `Please provide a valide title, content, status, category and student`
      );
  } else {
    res
      .status(400)
      .json(
        `You must provide a valide title, content, status, category and student`
      );
  }
}

function validateNewUserBody(req, res, next) {
  if (
    req.body.first_name &&
    req.body.last_name &&
    req.body.username &&
    req.body.password &&
    req.body.role
  ) {
    next();
  } else if (
    !req.body.first_name ||
    !req.body.last_name ||
    !req.body.username ||
    !req.body.password ||
    !req.body.role
  ) {
    res
      .status(400)
      .json(
        `Please provide your first and last name, a unique username, password and your role.`
      );
  } else {
    res
      .status(400)
      .json(
        `You must provide your first and last name, a unique username, password and your role.`
      );
  }
}
