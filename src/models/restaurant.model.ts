import mongoose, { Document } from "mongoose";

interface Restaurant extends Document {
  name: string;
  email: string;
  address: string;
  photUrl: string;
}

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  photoUrl: String,
});

const Restaurant = mongoose.model<Restaurant>("Restaurant", restaurantSchema);

export default Restaurant;
