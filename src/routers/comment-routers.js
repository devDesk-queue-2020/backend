const router = require("express").Router();
const Comment = require("../database/models/comment-models");
const Ticket = require("../database/models/ticket-models");
const {
  validateCommentBody
} = require("../middleware/error-handling-middleware");
const { auth } = require("../middleware/authentication-middleware");

// ---------------- GET ---------------- //

router.get("/", auth, (req, res) => {
  Comment.getAllComments()
    .then(comments => {
      res.status(200).json(comments);
    })
    .catch(error => {
      res.status(500).json(error.message);
    });
});

router.get("/:id", auth, (req, res) => {
  Comment.getCommentById(req.params.id)
    .then(comment => {
      res.status(200).json(comment);
    })
    .catch(error => {
      res.status(500).json(error.message);
    });
});

// ---------------- POST ---------------- //

router.post("/", auth, validateCommentBody, (req, res) => {
  Comment.addNewComment(req.body)
    .then(comment => {
      res.status(201).json(comment);
      Ticket.getTicketById(comment.ticket_id);
    })
    .catch(error => {
      res.status(500).json(error.message);
    });
});

// ---------------- PUT ---------------- //

router.put("/:id", auth, validateCommentBody, (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  Comment.updateComment(id, changes)
    .then(comment => {
      if (comment) {
        Ticket.updateTicketStatus(comment.ticket_id);
        res
          .status(202)
          .json({ message: `Comment has been successfully updated`, comment });
      } else {
        res.status(404).json({ message: `There is no comment with this id` });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: error.message
      });
    });
});

// ---------------- DELETE ---------------- //

router.delete("/:id", auth, (req, res) => {
  Comment.deleteById(req.params.id)
    .then(success => {
      if (success === 1) {
        res
          .status(202)
          .json({ message: `Comment has been successfully deleted` });
      } else {
        res.status(404).json({ message: `There is no comment with this id` });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: error.message
      });
    });
});

module.exports = router;
