const router = require("express").Router();

const userRouter = require("./users-router");
const ticketRouter = require("./ticket-routers");

router.use("/api/users", userRouter);
router.use("/api/tickets", ticketRouter);

module.exports = router;
