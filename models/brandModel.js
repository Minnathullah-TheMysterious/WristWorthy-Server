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
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const brandModel = model("brand", brandSchema);
export default brandModel;
