import request from "supertest";
import { app } from "../server";
import path from "path";
import mongoose from "mongoose";
import Product from "../models/product.model";

jest.setTimeout(60000);
beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI as string);
});

afterAll(async () => {
  // await Product.deleteMany({});
  await mongoose.connection.close();
});

describe("POST /product", () => {
  it("returns 201 when all required fields are passed", async () => {
    const res = await request(app)
      .post("/api/product/67333c3a5b5ec80cb4179f1e")
      .field("name", "indomie")
      .field("price", 600)
      .field("category", "junk")
      .attach("photoUrl", path.resolve(__dirname, "indomie-noodles.webp"));

    expect(res.statusCode).toEqual(201);
  });

  it("returns 400 when the required fields arent passed", async () => {
    const res = await request(app)
      .post("/api/product/67333c3a5b5ec80cb4179f1e")
      .field("name", "");

    expect(res.statusCode).toEqual(400);
  });
});

describe("DELETE /product", () => {
  it("deletes the product and returns status 200 when correct id is passed", async () => {
    const res = await request(app).delete(
      "/api/product/673340fbfed9badfb4102cd5"
    );

    expect(res.statusCode).toEqual(200);
  });

  it("return 404 when the incorrect id is passed", async () => {
    const res = await request(app).delete(
      "/api/product/673340fbfed9badfb3102cd5"
    );

    expect(res.statusCode).toEqual(404);
  });
});
