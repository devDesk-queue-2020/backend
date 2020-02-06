const db = require("../../dbConfig");
const Category = require("../categories-models");

beforeEach(async () => {
  await db("categories").truncate();
});

describe("categories-module.js module", () => {
  // ---------------- INSERT ---------------- //

  describe("addNewCategory()", () => {
    it("inserts a new category into the db", async () => {
      await Category.addNewCategory({
        category_name: "Test Category"
      });

      const categories = await db("categories");
      expect(categories).toHaveLength(1);
    });
    it("inserts the new catgory and returns the added object", async () => {
      const category = await Category.addNewCategory({
        category_name: "Test Category"
      });
      expect(category).toMatchObject({
        category_name: "Test Category"
      });
    });
  });

  // ---------------- GET ---------------- //

  describe("getAllCategories()", () => {
    it("returns an array of categories", async () => {
      await db("categories").insert({
        category_name: "First Test Category"
      });
      await db("categories").insert({
        category_name: "Second Test Category"
      });
      await db("categories").insert({
        category_name: "Third Test Category"
      });
      const categories = await Category.getAllCategories();
      expect(categories).toHaveLength(3);
    });
  });

  describe("getCategoryById()", () => {
    it("returns the correct category object", async () => {
      const [id] = await db("categories").insert({
        category_name: "First Test Category"
      });
      await db("categories").insert({
        category_name: "Second Test Category"
      });

      const category = await Category.getCategoryById(id);
      expect(category).toMatchObject({
        category_name: "First Test Category"
      });
    });
  });

  // ---------------- DELETE ---------------- //

  describe("deleteById()", () => {
    it("removes the category and the db has the correct length", async () => {
      await db("categories").insert({
        category_name: "First Test Category"
      });
      await db("categories").insert({
        category_name: "Second Test Category"
      });
      await db("categories").insert({
        category_name: "Third Test Category"
      });
      let categories;
      categories = await db("categories");
      expect(categories).toHaveLength(3);
      await Category.deleteById(1);
      categories = await db("categories");
      expect(categories).toHaveLength(2);
    });
  });
});
