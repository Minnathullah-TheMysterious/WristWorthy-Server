import { Schema, Types, model } from "mongoose";

const orderSchema = new Schema(
  {
    user: { type: Types.ObjectId, ref: "user" },
    orders: [
      {
        products: [{product_id: { type: Types.ObjectId, ref: "product" }, quantity: Number}],
        totalItems: Number,
        totalAmount: Number,
        shippingAddress: Object,
        paymentMethod: String,
        status: { type: String, default: "Pending" },
      },
    ],
  },
  { timestamps: true }
);

const orderModel = model("order", orderSchema);
export default orderModel;
