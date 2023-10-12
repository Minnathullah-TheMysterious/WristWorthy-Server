import mongoose, { Schema, model } from "mongoose";

const promoSchema = new Schema(
  {
    promo_heading: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref:'category',
    },
    brand: {
      type: mongoose.Types.ObjectId,
      ref:'brand',
    },
    images: [
      {
        location: String,
        contentType: String,
        originalname: String,
        size: Number,
      },
    ],
  },
  { timestamps: true }
);

const promoModel = model("promo", promoSchema);
export default promoModel;
