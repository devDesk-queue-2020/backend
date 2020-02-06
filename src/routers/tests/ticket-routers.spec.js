const server = require("../../../server");
const request = require("supertest");
const headerConfigNoToken = {
  authorization: { Authorization: "no token" }
};

describe("ticket-routers.js module", () => {
  describe("bad request tests", () => {
    it("returns a 400 bad request if no auth header is in request", async () => {
      const res = await request(server).get("/api/tickets");
      expect(res.status).toBe(400);
    });

    it("returns a 400 bad request if no auth header is in request", () => {
      return request(server)
        .get("/api/tickets/1")
        .then(res => {
          expect(res.status).toBe(400);
        });
    });

    it("returns a 400 bad request if no auth header is in request", () => {
      return request(server)
        .delete("/api/tickets/1")
        .expect(400);
    });

    it("returns a 400 bad request if no auth header is in request", () => {
      return request(server)
        .put("/api/tickets/1")
        .expect(400);
    });
  });

  describe("bad token 401 request tests", () => {
    it("returns a 401 bad auth if token is invalid", async () => {
      const res = await request(server)
        .get("/api/tickets")
        .set(headerConfigNoToken);
      expect(res.status).toBe(401);
    });

    it("returns a 401 bad auth if token is invalid", async () => {
      const res = await request(server)
        .get("/api/tickets/1")
        .set(headerConfigNoToken);
      expect(res.status).toBe(401);
    });

    it("returns a 401 auth if token is invalid", async () => {
      const res = await request(server)
        .delete("/api/tickets/1")
        .set(headerConfigNoToken);
      expect(res.status).toBe(401);
    });

    it("returns a 401 auth if token is invalid", async () => {
      const res = await request(server)
        .put("/api/tickets/1")
        .set(headerConfigNoToken);
      expect(res.status).toBe(401);
    });
  });

  describe("header tests", () => {
    it("returns the right headers", () => {
      return request(server)
        .get("/api/tickets")
        .expect("Content-Length", "37")
        .expect("Content-Type", /utf/)
        .expect("Content-Type", /json/);
    });
  });
});
