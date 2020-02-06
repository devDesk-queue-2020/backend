const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const UserDB = require("../database/models/user-models");
const Ticket = require("../database/models/ticket-models");
const { auth, helperAuth } = require("../middleware/authentication-middleware");
const {
  validateNewUserBody,
  validateUsername,
  validateUniqueUser,
  validateLoginBody,
  validateRegexNewUser
} = require("../middleware/error-handling-middleware");
const sendMail = require("./mail");

function makeToken(user, status) {
  const payload = {
    user_id: user.id,
    username: user.username,
    role: user.role
  };

  const options = {
    expiresIn: "1d",
    audience: status
  };
  const token = jwt.sign(
    payload,
    process.env.JWT_SECRET || "thesecret",
    options
  );
  return token;
}

router.post(
  "/register",
  validateNewUserBody,
  validateRegexNewUser,
  validateUniqueUser,
  (req, res) => {
    const { first_name, last_name, username, email, password, role } = req.body;
    const bcryptHash = bcrypt.hashSync(password, 10);
    const user = {
      first_name,
      last_name,
      username,
      email,
      password: bcryptHash,
      role
    };
    UserDB.addUser(user)
      .then(saved => {
        sendMail(user.email)
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          });
        res.status(201).json({
          success: "Successfully created new User",
          userData: { ...user, password: "ENCRYPTED" }
        });
      })
      .catch(error => {
        res.status(500).json({
          error: "Server Error"
        });
      });
  }
);

router.post("/login", validateUsername, validateLoginBody, (req, res) => {
  const { username, password } = req.body;

  UserDB.findUserBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        if (user.role === "Helper") {
          const token = makeToken(user, "staffHelper");
          res.status(200).json({
            message: `Welcome ${user.username}!`,
            token: token
          });
        } else {
          const token = makeToken(user, "Student");
          res.status(200).json({
            message: `Welcome ${user.username}!`,
            token: token
          });
        }
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(error => {
      res.status(500).json({
        error: "Server Error"
      });
    });
});

router.get("/", helperAuth, (req, res) => {
  UserDB.getAllUsers()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json({
        error: "Server error"
      });
    });
});

router.get("/:id", auth, (req, res) => {
  const { id } = req.params;

  let tickets;

  Ticket.getTicketsByStudent(id)
    .then(studentTickets => {
      tickets = studentTickets;
    })
    .catch(error => {
      res.status(500).json(error.message);
    });

  UserDB.findUserById(id)
    .then(user => {
      res.status(200).json({ userData: { ...user, userTickets: tickets } });
    })
    .catch(error => {
      res.status(500).json({
        error: "Server error"
      });
    });
});

router.delete("/:id", auth, (req, res) => {
  const { id } = req.params;

  UserDB.deleteUser(id)
    .then(user => {
      res.status(200).json({
        success: "User deleted"
      });
    })
    .catch(error => {
      res.status(500).json({
        error: "Server error"
      });
    });
});

router.put("/:id", auth, (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  UserDB.updateUser(id, changes)
    .then(success => {
      UserDB.findUserById(id)
        .then(user => {
          res.status(200).json({
            success: "User updated",
            newUserData: user
          });
        })
        .catch(error => {
          res.status(500).json(error.message);
        });
    })
    .catch(error => {
      res.status(500).json({
        error: "Server error"
      });
    });
});

module.exports = router;
