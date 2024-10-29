import express, { Request, Response } from "express";
import { createRestaurant } from "../controllers/restaurant.controller";

const router = express.Router();

router.post("/", createRestaurant);

export default router;
