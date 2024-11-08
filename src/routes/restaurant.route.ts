import express from "express";
import { createRestaurant } from "../controllers/restaurant.controller";
import upload from "../config/multer.config";
import validateRestaurant from "../middleware/validateRestaurant";
import restaurantSchema from "../schema/restaurant.schema";

const router = express.Router();

router.post(
  "/",
  upload.single("photoUrl"),
  validateRestaurant(restaurantSchema),
  createRestaurant
);

export default router;
