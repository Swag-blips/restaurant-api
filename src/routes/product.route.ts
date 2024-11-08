import express from "express";
import { createProduct } from "../controllers/product.controller";
import upload from "../config/multer.config";

const router = express.Router();

router.post("/:restaurantId", upload.single("photoUrl"), createProduct);

export default router;
