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
  await Product.deleteMany({});
  await mongoose.connection.close();
});

describe("POST /product", () => {
  it("returns 201 when all required fields are passed", async () => {
    const res = await request(app)
      .post("/api/product/672ea8cb3accca50e00c7c39")
      .field("name", "indomie")
      .field("price", 600)
      .field("category", "junk")
      .attach("photoUrl", path.resolve(__dirname, "indomie-noodles.webp"));

    expect(res.statusCode).toEqual(201);
  });

  it("returns 400 when the required fields arent passed", async () => {
    const res = await request(app)
      .post("/api/product/672ea8cb3accca50e00c7c39")
      .field("name", "");

    expect(res.statusCode).toEqual(400);
  });
});
