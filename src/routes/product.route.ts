import express from "express";
import {
  createProduct,
  deleteProduct,
} from "../controllers/product.controller";
import upload from "../config/multer.config";

const router = express.Router();

router.post("/:id", upload.single("photoUrl"), createProduct);
router.delete("/:id", deleteProduct);

export default router;
