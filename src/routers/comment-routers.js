const router = require("express").Router();
const Comments = require("../database/models/comment-models");

// ---------------- GET ---------------- //

router.get("/all", (req, res) => {
  Comments.getAllComments()
    .then(comments => {
      res.status(200).json(comments);
    })
    .catch(error => {
      res.status(500).json(error.message);
    });
});

router.get("/:id", (req, res) => {
  Comments.getCommentById(req.params.id)
    .then(comment => {
      res.status(200).json(comment);
    })
    .catch(error => {
      res.status(500).json(error.message);
    });
});

// ---------------- POST ---------------- //

router.post("/", (req, res) => {
  Comments.addNewComment(req.body)
    .then(id => {
      console.log(id);
    })
    .catch(error => {
      res.status(500).json(error.message);
    });
});

module.exports = router;
