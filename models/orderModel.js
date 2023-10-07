import { Schema, Types, model } from "mongoose";

const orderItemSchema = new Schema(
  {
    products: [
      {
        product_id: { type: Types.ObjectId, ref: "product" },
        quantity: Number,
      },
    ],
    totalItems: Number,
    totalAmount: Number,
    shippingAddress: Object,
    //we can add enum types
    paymentMethod: String,
    status: { type: String, default: "pending" },
    paymentStatus: { type: String, default: "pending" },
  },
  { timestamps: true }
);

const orderSchema = new Schema(
  {
    user: { type: Types.ObjectId, ref: "user" },
    orders: [orderItemSchema],
  },
  { timestamps: true }
);

const orderModel = model("order", orderSchema);
export default orderModel;
