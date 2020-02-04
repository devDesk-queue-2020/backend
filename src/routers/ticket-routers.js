const router = require("express").Router();
const Ticket = require("../database/models/ticket-models");
const {
  validateNewTicketBody
} = require("../middleware/error-handling-middleware");
const { auth } = require("../middleware/authentication-middleware");

// ---------------- GET ---------------- //

router.get("/", auth, (req, res) => {
  Ticket.getAllTickets()
    .then(tickets => {
      res.status(200).json(tickets);
    })
    .catch(error => {
      res.status(500).json(error.message);
    });
});

router.get("/:id", auth, (req, res) => {
  Ticket.getTicketById(req.params.id)
    .then(ticket => {
      res.status(200).json(ticket);
    })
    .catch(error => {
      res.status(500).json(error.message);
    });
});

router.get("/category/:category", auth, (req, res) => {
  Ticket.getTicketsByCategory(req.params.category)
    .then(tickets => {
      res.status(200).json(tickets);
    })
    .catch(error => {
      res.status(500).json(error.message);
    });
});

// ---------------- POST ---------------- //

router.post("/", auth, validateNewTicketBody, (req, res) => {
  Ticket.addNewTicket(req.body)
    .then(ticket => {
      res
        .status(201)
        .json({ message: `New category was successfully created`, ticket });
    })
    .catch(error => {
      res.status(500).json(error.message);
    });
});

// ---------------- PUT ---------------- //

router.put("/:id", auth, validateNewTicketBody, (req, res) => {
  Ticket.updateTicket(req.params.id, req.body)
    .then(ticket => {
      res
        .status(201)
        .json({ message: `New category was successfully created`, ticket });
    })
    .catch(error => {
      res.status(500).json(error.message);
    });
});

// ---------------- DELETE ---------------- //

router.delete("/:id", auth, (req, res) => {
  Ticket.deleteById(req.params.id)

    .then(success => {
      if (success === 1) {
        res
          .status(202)
          .json({ message: `Ticket has been successfully deleted` });
      } else {
        res.status(404).json({ message: `There are no tickets with this id` });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: error.message
      });
    });
});

module.exports = router;
