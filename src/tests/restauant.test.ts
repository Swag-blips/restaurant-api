import request from "supertest";
import { app } from "../server";
import path from "path";
import mongoose from "mongoose";

jest.setTimeout(60000);

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI as string);
});

describe("POST /restaurant", () => {
  it("returns status code 201 if the name, email, address and photoUrl are passed", async () => {
    const res = await request(app)
      .post("/api/restaurant")
      .field("name", "Test restaurant")
      .field("email", "test1@test.com")
      .field("address", "56 akobi crescent")
      .attach("photoUrl", path.resolve(__dirname, "test-image.jpg"));

    expect(res.statusCode).toBe(201);
  });

  it("returns bad request if the name field is missing", async () => {
    const res = await request(app).post("/api/restaurant").field("name", "");

    expect(res.statusCode).toBe(400);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});