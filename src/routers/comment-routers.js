const router = require("express").Router();
const Comment = require("../database/models/comment-models");
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
      res
        .status(201)
        .json({ message: `New comment was successfully created`, comment });
    })
    .catch(error => {
      res.status(500).json(error.message);
    });
});

// ---------------- PUT ---------------- //

// ---------------- DELETE ---------------- //

module.exports = router;
