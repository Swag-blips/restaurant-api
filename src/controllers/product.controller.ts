import { Request, Response } from "express";
import Restaurant from "../models/restaurant.model";
import { v2 as cloudinary } from "cloudinary";
import Product from "../models/product.model";
import mongoose from "mongoose";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, price, category } = req.body;

    const restaurantId = req.params.restaurantId;
    const photoUrl = req.file?.path;

    const restaurant = await Restaurant.findOne({ _id: restaurantId });

    if (!restaurant) {
      res.status(404).json({ message: "Restaurant not found" });
      return;
    }

    let resultUrl;

    if (!photoUrl) {
      res.status(400).json({ message: "Product image is required" });
      return;
    } else {
      resultUrl = await cloudinary.uploader.upload(photoUrl as string, {
        folder: "product",
      });
    }

    const newProduct = new Product({
      name,
      price,
      category,
      photoUrl: resultUrl?.secure_url,
      restaurantId: restaurant._id,
    });

    restaurant?.products.push(newProduct._id as mongoose.Types.ObjectId);
    await Promise.all([restaurant?.save(), newProduct.save()]);

    res
      .status(201)
      .json({ message: "Product successfully created", product: newProduct });
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
