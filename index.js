const server = require("./server");

const PORT = process.env.PORT || 5200;

server.listen(PORT, (req, res) => {
  console.log(`devDesk-2020 Server is listening on port: ${PORT}`);
});
