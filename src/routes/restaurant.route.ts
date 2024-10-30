import express from "express";
import { createRestaurant } from "../controllers/restaurant.controller";
import upload from "../config/multer.config";

const router = express.Router();

router.post("/", upload.single("photoUrl"), createRestaurant);


export default router;
