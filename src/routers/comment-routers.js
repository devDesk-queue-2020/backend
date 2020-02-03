const router = require("express").Router();
const Comment = require("../database/models/comment-models");

// ---------------- GET ---------------- //

router.get("/all", (req, res) => {
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
    .then(id => {
      res
        .status(201)
        .json(`New comment was successfully created with the id: ${id} `);
    })
    .catch(error => {
      res.status(500).json(error.message);
    });
});

module.exports = router;
