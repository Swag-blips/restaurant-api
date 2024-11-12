import request from "supertest";
import { app } from "../server";
import path from "path";
import mongoose from "mongoose";
import { product } from "../models/product.model";

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

describe("GET /restaurant", () => {
  it("returns status code 201 when", async () => {
    const res = await request(app).get("/api/restaurant");

    expect(res.statusCode).toEqual(200);
  });
});

describe("GET /restaurant/:id", () => {
  it("returns status code 200 and response body", async () => {
    const res = await request(app).get(
      "/api/restaurant/67333284dc8ed10395bae2de"
    );

    expect(res.body).toHaveProperty("name");
    expect(res.statusCode).toEqual(200);
  });

  it("returns status code 404 when wrong id is passed", async () => {
    const res = await request(app).get(
      "/api/restaurant/6732faa1c0448d742b742ee6"
    );

    expect(res.body).toHaveProperty("error");
    expect(res.statusCode).toBe(404);
  });
});

describe("DELETE /restaurant/:id", () => {
  it("Deletes restaurant when id is passed", async () => {
    const res = await request(app).delete(
      "/api/restaurant/67333284dc8ed10395bae2de"
    );

    expect(res.statusCode).toEqual(200);
  });
});

describe("GET /restaurant/product/:id", () => {
  it("returns status code 200 and products array", async () => {
    const res = await request(app).get(
      "/api/restaurant/products/67333284dc8ed10395bae2de"
    );

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("products");
    expect(res.body.products).toHaveLength(1);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
