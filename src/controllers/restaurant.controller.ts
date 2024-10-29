import { Request, Response } from "express";
import Restaurant from "../models/restaurant.model";

export const createRestaurant = async (req: Request, res: Response) => {
  try {
    const { name, address, photoUrl } = req.body;

    if (!name || !address || !photoUrl) {
      res
        .status(400)
        .json({ message: "You most provide the appropriate credentials" });

      return;
    }

    const restaurant = new Restaurant({
      name,
      address,
      photoUrl,
    });

    await restaurant.save();
    res.status(201).json(restaurant);
  } catch (err) {
    console.log(`an error occured in the createRestaurant controller ${err}`);
    res.status(500).json({ error: "Internal server error" });
  }
};
