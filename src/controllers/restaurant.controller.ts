import { Request, Response } from "express";
import Restaurant from "../models/restaurant.model";
import { v2 as cloudinary } from "cloudinary";
import Product from "../models/product.model";

export const createRestaurant = async (req: Request, res: Response) => {
  try {
    const { name, email, address } = req.body;

    const photoUrl = req.file?.path;

    const restaurant = await Restaurant.findOne({ name });

    if (!restaurant) {
      let resultUrl;

      if (photoUrl) {
        resultUrl = await cloudinary.uploader.upload(photoUrl as string, {
          folder: "restaurant",
        });
      }

      const newRestaurant = new Restaurant({
        name,
        email,
        address,
        photoUrl: resultUrl?.secure_url,
      });

      await newRestaurant.save();
      res.status(201).json(newRestaurant);
      return;
    } else {
      res.status(400).json({ error: "restaurant already exists" });
      return;
    }
  } catch (err) {
    console.log(`an error occured in the createRestaurant controller ${err}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllRestaurants = async (req: Request, res: Response) => {
  try {
    const restaurants = await Restaurant.find();

    res.status(200).json(restaurants);

    return;
  } catch (error) {
    console.log(
      `an error occured in the get all Restaurants controller ${error}`
    );
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getSpecificRestaurant = async (req: Request, res: Response) => {
  const restaurantId = req.params.id;

  try {
    const restaurant = await Restaurant.findById(restaurantId);

    if (!restaurant) {
      res.status(404).json({ error: "Restaurant not found" });
      return;
    }
    res.status(200).json(restaurant);
    return;
  } catch (error) {
    console.log(
      `an error occured in the get specific Restaurant controller ${error}`
    );
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getRestaurantsProducts = async (req: Request, res: Response) => {
  try {
    const restaurantId = req.params.id;

    const restaurantProducts = await Restaurant.findById(restaurantId).populate(
      "products"
    );

    if (!restaurantProducts) {
      res.status(404).json({ error: "Restaurant and products not found" });
      return;
    }

    res.status(200).json(restaurantProducts);
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteRestaurant = async (req: Request, res: Response) => {
  const restaurantId = req.params.id;
  try {
    const restaurant = await Restaurant.findById(restaurantId);

    if (!restaurant) {
      res.status(404).json({ error: "Restaurant does not exist" });
      return;
    }

    if (restaurant?.photoUrl) {
      const restaurantImgId = restaurant.photoUrl
        .split("/")
        .pop()
        ?.split(".")[0];

      if (restaurantImgId) {
        const res = await cloudinary.uploader.destroy(
          `restaurant/${restaurantImgId}`,
          {
            resource_type: "image",
          }
        );
      }
    }
    await Restaurant.findByIdAndDelete(restaurantId);
    await Product.deleteMany({ restaurantId: restaurant?._id });

    res.status(200).json({ message: "restaurant successfully deleted" });
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateRestaurant = async (req: Request, res: Response) => {
  const { name, email, address } = req.body;

  const photoUrl = req.file?.path;
  const restaurantId = req.params.id;

  // if (!name || !email || !address) {
  //   res.status(404).json({ error: "" });
  // }

  try {
    const restaurant = await Restaurant.findById(restaurantId);

    if (!restaurant) {
      res.status(404).json({ error: "Restaurant does not exist" });
      return;
    }

    let resultUrl;
    if (restaurant.photoUrl) {
      const restaurantImgId = restaurant.photoUrl
        .split("/")
        .pop()
        ?.split(".")[0];

      if (restaurantImgId) {
        await cloudinary.uploader.destroy(`restaurant/${restaurantImgId}`, {
          resource_type: "image",
        });

        if (photoUrl) {
          resultUrl = await cloudinary.uploader.upload(photoUrl as string, {
            folder: "restaurant",
          });
        }
      }
    }

    restaurant.name = name || restaurant.name;
    restaurant.email = email || restaurant.email;
    restaurant.address = address || restaurant.address;
    restaurant.photoUrl = resultUrl?.secure_url || restaurant.photoUrl;

    await restaurant.save();

    res.status(200).json({ message: "profile successfully updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
