const router = require("express").Router();

const userRouter = require("./users-router");
const ticketRouter = require("./ticket-routers");
const commentRouter = require("./comment-routers");

router.use("/api/users", userRouter);
router.use("/api/tickets", ticketRouter);
router.use("/api/comments", commentRouter);

module.exports = router;
