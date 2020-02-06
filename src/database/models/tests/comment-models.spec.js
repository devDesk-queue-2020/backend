const db = require("../../dbConfig");
const Comment = require("../comment-models");

beforeEach(async () => {
  await db("comments").truncate();
});

describe("comment-module.js module", () => {
  // ---------------- INSERT ---------------- //

  describe("addNewComment()", () => {
    it("inserts a new comment into the db", async () => {
      await Comment.addNewComment({
        content: "This is a test comment",
        author_id: 1,
        ticket_id: 1
      });

      const comments = await db("comments");
      expect(comments).toHaveLength(1);
    });

    it("inserts the new comment and returns correct data", async () => {
      const comment = await Comment.addNewComment({
        content: "This is a test comment",
        author_id: 1,
        ticket_id: 1
      });
      expect(comment).toMatchObject({
        content: "This is a test comment",
        ticket_id: 1
      });
    });
  });

  // ---------------- GET ---------------- //

  describe("getAllComments()", () => {
    it("returns an array of comments", async () => {
      let comments;
      comments = await Comment.getAllComments();
      expect(comments).toHaveLength(0);
      await db("comments").insert({
        content: "This is the first test comment",
        author_id: 1,
        ticket_id: 1
      });
      await db("comments").insert({
        content: "This is the second test comment",
        author_id: 1,
        ticket_id: 1
      });
      comments = await Comment.getAllComments();
      expect(comments).toHaveLength(2);
    });
  });

  describe("getCommentById()", () => {
    it("returns the correct comment object", async () => {
      const [id] = await db("comments").insert({
        content: "This is the first test comment",
        author_id: 1,
        ticket_id: 1
      });
      await db("comments").insert({
        content: "This is the second test comment",
        author_id: 2,
        ticket_id: 1
      });

      const comment = await Comment.getCommentById(id);
      expect(comment).toMatchObject({
        content: "This is the first test comment",
        ticket_id: 1
      });
    });
  });

  // ---------------- UPDATE ---------------- //

  describe("updateComment()", () => {
    it("returns an updated comment object", async () => {
      const newComment = await db("comments").insert({
        content: "This is the first test comment",
        author_id: 1,
        ticket_id: 1
      });
      let comment;
      const date = await newComment.created_by;
      [comment] = await db("comments");
      expect([comment]).toHaveLength(1);
      expect(comment).toMatchObject({
        content: "This is the first test comment",
        author_id: 1,
        ticket_id: 1
      });
      comment = await Comment.updateComment(1, {
        id: 1,
        content: "This is the updated test comment",
        author_id: 1,
        ticket_id: 1,
        created_by: date
      });
      expect(comment).toMatchObject({
        content: "This is the updated test comment",
        ticket_id: 1
      });
    });
  });

  // ---------------- DELETE ---------------- //

  describe("deleteById()", () => {
    it("removes the comment and the db has the correct length", async () => {
      await db("comments").insert({
        content: "This is the first test comment",
        author_id: 1,
        ticket_id: 1
      });
      await db("comments").insert({
        content: "This is the second test comment",
        author_id: 2,
        ticket_id: 1
      });
      let comments;
      comments = await db("comments");
      expect(comments).toHaveLength(2);
      await Comment.deleteById(1);
      comments = await db("comments");
      expect(comments).toHaveLength(1);
    });
  });
});
