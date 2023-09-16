import mongoose, { Schema, model } from "mongoose";

const wishlistSchema = new Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "user" },
    products: [{ type: mongoose.Types.ObjectId, ref: "product" }],
  },
  { timestamps: true }
);

const wishlistModel = model("wishlist", wishlistSchema)
export default wishlistModel;
