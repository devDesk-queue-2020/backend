const router = require("express").Router();
const Category = require("../database/models/categories-models");

// ---------------- GET ---------------- //

router.get("/", (req, res) => {
  Category.getAllCategories()
    .then(catagories => {
      res.status(200).json(catagories);
    })
    .catch(error => {
      res.status(500).json(error.message);
    });
});

router.get("/:id", (req, res) => {
  Category.getCategoryById(req.params.id)
    .then(catagory => {
      res.status(200).json(catagory);
    })
    .catch(error => {
      res.status(500).json(error.message);
    });
});

// ---------------- POST ---------------- //

router.post("/", (req, res) => {
  Category.addNewCategory(req.body)
    .then(category => {
      res
        .status(201)
        .json({ message: `New category was successfully created`, category });
    })
    .catch(error => {
      res.status(500).json(error.message);
    });
});

module.exports = router;
