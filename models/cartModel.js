import mongoose, { Schema, model } from "mongoose";

const cartSchema = Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "user" },
    items: [
      {
        product: { type: mongoose.Types.ObjectId, ref: "product" },
        quantity: { type: Number, default: 1 },
      },
    ],
  },
  { timestamps: true }
);

const cartModel = model("cart", cartSchema);
export default cartModel;
