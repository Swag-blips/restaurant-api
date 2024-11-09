import express from "express";
import dotenv from "dotenv";
import connectMongoDb from "./db/connectMongo";
import restaurantRoutes from "./routes/restaurant.route";
import productRoutes from "./routes/product.route";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLODUINARY_SECRET_KEY,
});
export const app = express();

app.use(express.json());

app.use("/api/restaurant", restaurantRoutes);
app.use("/api/product", productRoutes);

app.listen(4500, () => {
  connectMongoDb();
  console.log("Server is listening on port 4500");
});
