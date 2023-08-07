import { Schema, model } from "mongoose";

const categorySchema = new Schema({
  category_name: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    lowercase: true,
  },
  photo: {
    data: Buffer,
    contentType: String
  },
});

const categoryModel = model("categories", categorySchema);
export default categoryModel;
