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
      min:[0, 'Wrong minimum discount'],
      default: 1,
    },
    price: {
      type: Number,
      min:[0, 'Wrong minimum price'], max:[10000, 'Wrong maximum price'],
      required: true,
    },
    discountPercentage: {
      type: Number,
      min:[0, 'Wrong minimum discount'], max:[100, 'Wrong maximum discount'],
      default: 0,
    },
    rating: {
      type: Number,
      min:[1, 'Wrong minimum discount'], max:[5, 'Wrong maximum discount'],
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
