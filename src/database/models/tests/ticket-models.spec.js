const db = require("../../dbConfig");
const Ticket = require("../ticket-models");

beforeEach(async () => {
  await db("tickets").truncate();
});

describe("ticket-routers.js module", () => {
  describe("addNewTicket()", () => {
    it("it inserts a new ticket into the db", async () => {
      Ticket.addNewTicket({
        title: "Test Ticket",
        content: " This is a test Ticket",
        category_id: 5,
        student_id: 1
      });
      const ticket = await db("tickets");
      expect(ticket).toHaveLength(1);
    });
  });
});
