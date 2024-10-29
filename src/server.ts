import express from "express";
import dotenv from "dotenv";
import connectMongoDb from "../db/connectMongo";
import restaurantRoutes from "./routes/restaurant.route";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/restaurant", restaurantRoutes);

app.listen(3000, () => {
  connectMongoDb();
  console.log("Server is listening on port 3000");
});
