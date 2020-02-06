const server = require("./server");
const request = require("supertest");

describe("server.js module", () => {
  it("has the right environment for DB_ENV", done => {
    expect(process.env.DB_ENV).toBe("testing");
    done();
  });

  describe("live API endpoint", () => {
    it("returns a 200 OK", done => {
      request(server)
        .get("/")
        .expect(200);
      done();
    });
    it("returns a json response", done => {
      request(server)
        .get("/")
        .expect("Content-Type", /json/);
      done();
    });
  });
});
