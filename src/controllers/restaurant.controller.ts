import { Request, Response } from "express";
import Restaurant from "../models/restaurant.model";
import { v2 as cloudinary } from "cloudinary";

export const createRestaurant = async (req: Request, res: Response) => {
  try {
    const { name, address, photoUrl } = req.body;

    if (!name || !address || !photoUrl) {
      res
        .status(400)
        .json({ message: "You most provide the appropriate credentials" });

      return;
    }

    let resultUrl;
    if (photoUrl) {
      resultUrl = await cloudinary.uploader.upload(photoUrl, {
        folder: "restaurant",
      });
    }

    const restaurant = new Restaurant({
      name,
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
