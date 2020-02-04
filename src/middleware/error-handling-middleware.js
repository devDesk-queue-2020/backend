const User = require("../database/models/user-models");
const Category = require("../database/models/categories-models");

module.exports = {
  validateUsername,
  validateUniqueUsername,
  validateNewTicketBody,
  validateNewUserBody,
  validateLoginBody,
  validateCommentBody,
  validateNewCategoryBody
};

function validateUsername(req, res, next) {
  User.getAllUsers()
    .then(users => {
      const usernames = users.map(curr => curr.username);
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

function validateUniqueUsername(req, res, next) {
  User.findUserBy(req.body)
    .then(user => {
      if (!user) {
        next();
      } else {
        res.status(400).json(`This is not a unique username`);
      }
    })
    .catch(error => {
      res.status(400).json(`Error validating unique username`);
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
        `Please provide a valid title, content, status, category and student`
      );
  } else {
    res
      .status(400)
      .json(
        `You must provide a valid title, content, status, category and student`
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

function validateLoginBody(req, res, next) {
  if (req.body.username && req.body.password) {
    next();
  } else if (!req.body.username || !req.body.password) {
    res
      .status(400)
      .json(`Please provide your personal username and valid password`);
  } else {
    res
      .status(400)
      .json(`You must provide your personal username and valid password`);
  }
}

function validateCommentBody(req, res, next) {
  if (req.body.content && req.body.author_id && req.body.ticket_id) {
    next();
  } else if (!req.body.content || !req.body.author_id || !req.body.ticket_id) {
    res
      .status(400)
      .json(`Please ensure you provide content, an author id and ticket id`);
  } else {
    res
      .status(400)
      .json(`You must provide content, an author id and ticket id`);
  }
}

function validateNewCategoryBody(req, res, next) {
  if (req.body.category_name) {
    Category.getAllCategories().then(categories => {
      const categoryNames = categories.map(curr => curr.category_name);
      if (categoryNames.includes(req.body.category_name)) {
        res.status(400).json(`You must provide a new unqiue category_name`);
      } else {
        next();
      }
    });
  } else {
    res.status(400).json(`You must provide a category_name`);
  }
}
