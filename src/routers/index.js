const router = require("express").Router();

const userRouter = require("./users-router");
const ticketRouter = require("./ticket-routers");
const commentRouter = require("./comment-routers");
const catergoryRouter = require("./categories-routers");

router.use("/api/users", userRouter);
router.use("/api/tickets", ticketRouter);
router.use("/api/comments", commentRouter);
router.use("/api/category", catergoryRouter);

module.exports = router;
