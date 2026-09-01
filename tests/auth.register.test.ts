import { describe, it, expect } from "vitest";
import request from "supertest";
import { createApp } from "@/app";

const app = createApp();

describe("POST /api/auth/register", () => {
  it("registers a new account", async () => {
    const res = await request(app).post("/api/auth/register").send({
      firstName: "Ada",
      lastName: "Lovelace",
      username: "ada",
      email: "ada@example.com",
      password: "password123",
      agree: true,
    });
    expect(res.status).toBe(200);
    expect(res.body.accessToken).toBeTruthy();
  });
});