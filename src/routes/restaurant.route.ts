import express from "express";
import { createRestaurant } from "../controllers/restaurant.controller";
import upload from "../config/multer.config";
import validate from "../../middleware/validateSchema";
import restaurantSchema from "../../schema/restaurantSchema";

const router = express.Router();

router.post(
  "/",
  upload.single("photoUrl"),
  validate(restaurantSchema),
  createRestaurant
);

export default router;
