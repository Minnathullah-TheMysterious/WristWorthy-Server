import { Router } from "express";
import {
  getAllOrdersController,
  getUserOrdersController,
  placeOrderController,
  updateOrderStatusController,
} from "../controllers/orderController.js";

const router = Router();

//Place Order
router.post("/place-order/:userId", placeOrderController);

//Fetch User Orders
router.get("/get-user-orders/:userId", getUserOrdersController);

//Fetch all Orders
router.get("/get-all-orders", getAllOrdersController);

//Update Order Status
router.put("/update-order-status/:userId/:orderId/:orderStatus", updateOrderStatusController);

export default router;
