const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const routes = require("./data/routers");
const middleware = require("./data/middleware");

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());

middleware(server);

server.use(routes);

server.get("/", (req, res) => {
  res.json(
    "Thank you for visiting the devDesk-2020 API. Please read docs for relevant endpoints"
  );
});

module.exports = server;
