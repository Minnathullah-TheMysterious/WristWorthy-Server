import mongoose, { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
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
      ref: "brand",
      required: true,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "category",
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
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const productModel = model("product", productSchema);
export default productModel;
