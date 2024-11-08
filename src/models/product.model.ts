import mongoose, { Document } from "mongoose";

export interface product extends Document {
  name: string;
  photoUrl: string;
  price: Number;
  category: string;
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
  },
  { timestamps: true }
);

const Product = mongoose.model<product>("Product", productSchema);

export default Product;
