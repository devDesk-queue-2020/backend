const db = require("../../dbConfig");
const Ticket = require("../ticket-models");

beforeEach(async () => {
  await db("tickets").truncate();
});

describe("ticket-models.js module", () => {
  // ---------------- INSERT ---------------- //

  describe("addNewTicket()", () => {
    it("inserts a new ticket into the db", async () => {
      let tickets;
      tickets = await db("tickets");
      expect(tickets).toHaveLength(0);
      await Ticket.addNewTicket({
        title: "Test Ticket",
        content: " This is a test Ticket",
        category_id: 5,
        student_id: 1
      });

      tickets = await db("tickets");
      expect(tickets).toHaveLength(1);
    });
  });

  // ---------------- GET ---------------- //

  describe("getAllTickets()", () => {
    it("returns an array of ticket objects", async () => {
      let tickets;
      tickets = await Ticket.getAllTickets();
      expect(tickets).toHaveLength(0);
      await db("tickets").insert({
        title: "Test Ticket 1",
        content: "This is a test Ticket",
        category_id: 1,
        student_id: 1
      });
      await db("tickets").insert({
        title: "Test Ticket 2",
        content: "This is a test Ticket",
        category_id: 1,
        student_id: 1
      });
      await db("tickets").insert({
        title: "Test Ticket 3",
        content: "This is a test Ticket",
        category_id: 1,
        student_id: 1
      });
      tickets = await Ticket.getAllTickets();
      expect(tickets).toHaveLength(3);
    });
  });

  describe("getTicketById()", () => {
    it("returns the correct ticket object", async () => {
      const [id] = await db("tickets").insert({
        title: "Test Ticket",
        content: "This is a test Ticket",
        category_id: 5,
        student_id: 1
      });

      const ticket = await Ticket.getTicketById(id);

      expect(ticket).toMatchObject({
        title: "Test Ticket",
        content: "This is a test Ticket",
        category_name: "Redux",
        username: "amin"
      });
    });
    it("returns a ticket object which replaces category_id to category_name", async () => {
      const [id] = await db("tickets").insert({
        title: "Test Ticket",
        content: "This is a test Ticket",
        category_id: 5,
        student_id: 1
      });

      const ticket = await Ticket.getTicketById(id);

      expect(ticket).not.toHaveProperty("category_id", 3);
      expect(ticket).toHaveProperty("category_name", "Redux");
    });
  });

  describe("getTicketsByStudent()", () => {
    it("returns an array of tickets with the correct length", async () => {
      await db("tickets").insert({
        title: "Test Ticket 1",
        content: "This is a test Ticket",
        category_id: 5,
        student_id: 1
      });
      await db("tickets").insert({
        title: "Test Ticket 2",
        content: "This is a test Ticket",
        category_id: 1,
        student_id: 2
      });
      await db("tickets").insert({
        title: "Test Ticket 3",
        content: "This is a test Ticket",
        category_id: 6,
        student_id: 1
      });

      const tickets = await Ticket.getTicketsByStudent(1);

      expect(tickets).toHaveLength(2);
    });
    it("returns an array of tickets which are assigned to the correct student", async () => {
      await db("tickets").insert({
        title: "Test Ticket 1",
        content: "This is a test Ticket",
        category_id: 5,
        student_id: 1
      });
      await db("tickets").insert({
        title: "Test Ticket 2",
        content: "This is a test Ticket",
        category_id: 1,
        student_id: 2
      });

      const [tickets] = await Ticket.getTicketsByStudent(1);

      expect(tickets).toMatchObject({
        title: "Test Ticket 1",
        content: "This is a test Ticket"
      });
    });
  });

  describe("getTicketsByCategory()", () => {
    it("returns an array of tickets with the correct length", async () => {
      await db("tickets").insert({
        title: "Test Ticket 1",
        content: "This is a test Ticket",
        category_id: 5,
        student_id: 1
      });
      await db("tickets").insert({
        title: "Test Ticket 2",
        content: "This is a test Ticket",
        category_id: 6,
        student_id: 2
      });
      await db("tickets").insert({
        title: "Test Ticket 3",
        content: "This is a test Ticket",
        category_id: 6,
        student_id: 1
      });

      const tickets = await Ticket.getTicketsByCategory("Node.js");

      expect(tickets).toHaveLength(2);
    });

    it("returns an array of tickets which are assigned to the correct category", async () => {
      await db("tickets").insert({
        title: "Test Ticket 1",
        content: "This is a test Ticket",
        category_id: 5,
        student_id: 1
      });
      await db("tickets").insert({
        title: "Test Ticket 2",
        content: "This is a test Ticket",
        category_id: 1,
        student_id: 2
      });

      const [tickets] = await Ticket.getTicketsByCategory("HTML");

      expect(tickets).toHaveProperty("category_name", "HTML");
    });
  });

  // ---------------- UPDATE ---------------- //

  describe("updateTicket()", () => {
    it("returns the updated ticket object", async () => {
      const newTicket = await db("tickets").insert({
        title: "Test Ticket 1",
        content: "This is a test Ticket",
        category_id: 5,
        student_id: 1
      });
      let ticket;
      const date = await newTicket.created_by;
      [ticket] = await db("tickets");
      expect([ticket]).toHaveLength(1);
      expect(ticket).toMatchObject({
        title: "Test Ticket 1",
        content: "This is a test Ticket"
      });
      ticket = await Ticket.updateTicket(1, {
        id: 1,
        title: "Test Ticket 1",
        content: "Has been updated",
        category_id: 5,
        student_id: 1,
        created_by: date
      });
      expect(ticket).toMatchObject({
        title: "Test Ticket 1",
        content: "Has been updated"
      });
    });
  });

  // ---------------- DELETE ---------------- //

  describe("deleteById()", () => {
    it("removes the ticket and the db has the correct length", async () => {
      await db("tickets").insert({
        title: "Test Ticket 1",
        content: "This is a test Ticket",
        category_id: 5,
        student_id: 1
      });
      await db("tickets").insert({
        title: "Test Ticket 2",
        content: "This is a test Ticket",
        category_id: 6,
        student_id: 2
      });
      await db("tickets").insert({
        title: "Test Ticket 3",
        content: "This is a test Ticket",
        category_id: 6,
        student_id: 1
      });

      let tickets;
      tickets = await db("tickets");
      expect(tickets).toHaveLength(3);
      await Ticket.deleteById(1);
      tickets = await db("tickets");
      expect(tickets).toHaveLength(2);
    });
  });
});
