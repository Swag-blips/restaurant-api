import mongoose, { Document } from "mongoose";

interface Restaurant extends Document {
  name: string;
  email: string;
  products: Array<mongoose.Types.ObjectId>;
  address: string;
  photoUrl: string;
}

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      default: [],
    },
  ],
  address: {
    type: String,
    required: true,
  },
  photoUrl: String,
});

const Restaurant = mongoose.model<Restaurant>("Restaurant", restaurantSchema);

export default Restaurant;
