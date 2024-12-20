import express from "express";
import {
  createRestaurant,
  deleteRestaurant,
  getAllRestaurants,
  getRestaurantsProducts,
  getSpecificRestaurant,
  updateRestaurant,
} from "../controllers/restaurant.controller";
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

router.get("/", getAllRestaurants);
router.get("/:id", getSpecificRestaurant);
router.get("/products/:id", getRestaurantsProducts);
router.delete("/:id", deleteRestaurant);
router.put("/:id", upload.single("photoUrl"), updateRestaurant);

export default router;
