import mongoose, { Schema, model } from "mongoose";

const productSchema = new Schema({
  product_name: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    lowercase: true,
  },
  brand: {
    type: mongoose.Types.ObjectId,
    ref:"brands",
    required: true,
  },
  category: {
    type: mongoose.Types.ObjectId,
    ref:"categories",
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    default: 1,
  },
  price: {
    type: Number,
    required: true,
  },
  discountPercentage: {
    type: Number,
    default: 0,
  },
  rating: {
    type: Number,
  },
  thumbnail: {
    location: String,
    contentType: String,
    originalname: String,
    size: Number,
  },
  images: [
    {
      location: String,
      contentType: String,
      originalname: String,
      size: Number,
    },
  ],
}, {timestamps: true});

const productModel = model("products", productSchema);
export default productModel;
