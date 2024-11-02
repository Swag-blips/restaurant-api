import { Request, Response } from "express";
import Restaurant from "../models/restaurant.model";
import { v2 as cloudinary } from "cloudinary";

export const createRestaurant = async (req: Request, res: Response) => {
  try {
    const { name, email, address } = req.body;

    const photoUrl = req.file?.path;

    let resultUrl;

    if (photoUrl) {
      resultUrl = await cloudinary.uploader.upload(photoUrl as string, {
        folder: "restaurant",
      });
    }

    const restaurant = new Restaurant({
      name,
      email,
      address,
      photoUrl: resultUrl?.secure_url,
    });

    await restaurant.save();
    res.status(201).json(restaurant);
  } catch (err) {
    console.log(`an error occured in the createRestaurant controller ${err}`);
    res.status(500).json({ error: "Internal server error" });
  }
};
