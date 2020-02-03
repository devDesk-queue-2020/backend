const router = require("express").Router();
const Tickets = require("../database/models/ticket-models");

// ---------------- GET ---------------- //

router.get("/all", (req, res) => {
  Tickets.getAllTickets()
    .then(tickets => {
      res.status(200).json(tickets);
    })
    .catch(error => {
      res.status(500).json(error.message);
    });
});

router.get("/:id", (req, res) => {
  Tickets.getTicketById(req.params.id)
    .then(ticket => {
      res.status(200).json(ticket);
    })
    .catch(error => {
      res.status(500).json(error.message);
    });
});

router.get("/category/:id", (req, res) => {
  Tickets.getTicketByCategory(req.params.id)
    .then(tickets => {
      console.log(tickets);
      res.status(200).json(tickets);
    })
    .catch(error => {
      res.status(500).json(error.message);
    });
});

module.exports = router;
