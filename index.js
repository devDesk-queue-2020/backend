const dotenv = require("dotenv");
dotenv.config();

const server = require("./server.js");

const PORT = process.env.PORT || 5002;

server.listen(PORT, () => {
  console.log(`devDesk-2020 Server is listening on port: ${PORT}`);
});
