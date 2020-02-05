const server = require("./server");
const request = require("supertest");

describe("server.js module", () => {
  it("has the right environment for DB_ENV", () => {
    expect(process.env.DB_ENV).toBe("testing");
  });

  describe("live API endpoint", () => {
    it("returns a 200 OK", () => {
      return request(server)
        .get("/")
        .expect(200);
    });
    it("returns a json response", () => {
      return request(server)
        .get("/")
        .expect("Content-Type", /json/);
    });
  });
});
