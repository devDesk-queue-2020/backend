const router = require("express").Router();

const userRouter = require("./users-router");
const ticketRouter = require("./ticket-routers");

router.use(userRouter);
router.use(ticketRouter);

module.exports = router;
