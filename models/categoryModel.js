import { Schema, model } from "mongoose";

const categorySchema = new Schema(
  {
    category_name: {
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

const categoryModel = model("category", categorySchema);
export default categoryModel;
