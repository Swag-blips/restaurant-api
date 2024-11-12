import express from "express";
import {
  createProduct,
  deleteProduct,
  updateProduct,
} from "../controllers/product.controller";
import upload from "../config/multer.config";

const router = express.Router();

router.post("/:id", upload.single("photoUrl"), createProduct);
router.delete("/:id", deleteProduct);
router.put("/:id", upload.single("photoUrl"), updateProduct);

export default router;
