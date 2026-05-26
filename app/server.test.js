const test = require("node:test");
const assert = require("node:assert");
const request = require("supertest");
const app = require("./server");

test("GET /health should return healthy status", async () => {
  const response = await request(app).get("/health");

  assert.strictEqual(response.status, 200);
  assert.strictEqual(response.body.status, "healthy");
});

test("GET /users should return demo users", async () => {
  const response = await request(app).get("/users");

  assert.strictEqual(response.status, 200);
  assert.strictEqual(Array.isArray(response.body), true);
  assert.strictEqual(response.body.length, 2);
});

test("POST /login without username should return 400", async () => {
  const response = await request(app).post("/login").send({});

  assert.strictEqual(response.status, 400);
  assert.strictEqual(response.body.error, "Username is required");
});
