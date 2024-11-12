import mongoose, { Document } from "mongoose";

export interface product extends Document {
  name: string;
  photoUrl: string;
  price: number;
  category: string;
  restaurantId: mongoose.Types.ObjectId;
}

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    photoUrl: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
    },
  },
  { timestamps: true }
);

const Product = mongoose.model<product>("Product", productSchema);

export default Product;
