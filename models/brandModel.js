import { Schema, model } from "mongoose";

const brandSchema = new Schema(
  {
    brand_name: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      lowercase: true,
      unique: true,
    },
    image: {
      location: String,
      contentType: String,
      originalname: String,
      size: Number,
    },
  },
  { timestamps: true }
);

const brandModel = model("brands", brandSchema);
export default brandModel;
