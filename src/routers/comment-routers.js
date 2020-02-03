const router = require("express").Router();
const Comment = require("../database/models/comment-models");

// ---------------- GET ---------------- //

router.get("/", (req, res) => {
  Comment.getAllComments()
    .then(comments => {
      res.status(200).json(comments);
    })
    .catch(error => {
      res.status(500).json(error.message);
    });
});

router.get("/:id", (req, res) => {
  Comment.getCommentById(req.params.id)
    .then(comment => {
      res.status(200).json(comment);
    })
    .catch(error => {
      res.status(500).json(error.message);
    });
});

// ---------------- POST ---------------- //

router.post("/", (req, res) => {
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

module.exports = router;
