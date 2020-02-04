const router = require("express").Router();
const Tickets = require("../database/models/ticket-models");
const {
  validateNewTicketBody
} = require("../middleware/error-handling-middleware");
const { auth } = require("../middleware/authentication-middleware");

// ---------------- GET ---------------- //

router.get("/", auth, (req, res) => {
  Tickets.getAllTickets()
    .then(tickets => {
      res.status(200).json(tickets);
    })
    .catch(error => {
      res.status(500).json(error.message);
    });
});

router.get("/:id", auth, (req, res) => {
  Tickets.getTicketById(req.params.id)
    .then(ticket => {
      res.status(200).json(ticket);
    })
    .catch(error => {
      res.status(500).json(error.message);
    });
});

router.get("/category/:id", auth, (req, res) => {
  Tickets.getTicketByCategory(req.params.id)
    .then(tickets => {
      res.status(200).json(tickets);
    })
    .catch(error => {
      res.status(500).json(error.message);
    });
});

// ---------------- POST ---------------- //

router.post("/", auth, validateNewTicketBody, (req, res) => {
  Tickets.addNewTicket(req.body)
    .then(ticket => {
      res
        .status(201)
        .json({ message: `New category was successfully created`, ticket });
    })
    .catch(error => {
      res.status(500).json(error.message);
    });
});

module.exports = router;
