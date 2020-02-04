const router = require("express").Router();
const Category = require("../database/models/categories-models");
const { auth, helperAuth } = require("../middleware/authentication-middleware");
const {
  validateNewCategoryBody
} = require("../middleware/error-handling-middleware");

// ---------------- GET ---------------- //

router.get("/", auth, (req, res) => {
  Category.getAllCategories()
    .then(catagories => {
      res.status(200).json(catagories);
    })
    .catch(error => {
      res.status(500).json(error.message);
    });
});

router.get("/:id", auth, (req, res) => {
  Category.getCategoryById(req.params.id)
    .then(catagory => {
      res.status(200).json(catagory);
    })
    .catch(error => {
      res.status(500).json(error.message);
    });
});

// ---------------- POST ---------------- //

router.post("/", auth, validateNewCategoryBody, (req, res) => {
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

// ---------------- DELETE ---------------- //

router.delete("/:id", helperAuth, (req, res) => {
  Category.deleteById(req.params.id)
    .then(success => {
      if (success === 1) {
        res
          .status(202)
          .json({ message: `Category has been successfully deleted` });
      } else {
        res.status(404).json({ message: `There is no category with this id` });
      }
    })
    .catch(error => {
      res.status(500).json(error.message);
    });
});

module.exports = router;
