import mongoose, { Model } from "mongoose";

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  photoUrl: String,
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

export default Restaurant;
