import { Request, Response } from "express";
import Restaurant from "../models/restaurant.model";
import { v2 as cloudinary } from "cloudinary";
import Product from "../models/product.model";
import mongoose from "mongoose";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, price, category } = req.body;

    const restaurantId = req.params.id;
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

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;

    const product = await Product.findById(productId);

    if (!product) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    await Restaurant.findByIdAndUpdate(product.restaurantId, {
      $pull: {
        products: product._id,
      },
    });

    await Product.findByIdAndDelete(productId);

    res.status(200).json({ message: "Product successfully deleted" });
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
