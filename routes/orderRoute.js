import { Router } from "express";
import {
  getAllFilteredOrdersController,
  getOrderByIdController,
  getUserOrdersController,
  placeOrderController,
  updateOrderStatusController,
} from "../controllers/orderController.js";

const router = Router();

//Place Order
router.post("/place-order/:userId", placeOrderController);

//Fetch User Orders
router.get("/get-user-orders/:userId", getUserOrdersController);

//Fetch all/Filtered Orders
router.get("/get-all-filtered-orders", getAllFilteredOrdersController);

//Fetch Order By Id
router.get("/get-order-details/:orderId", getOrderByIdController);

//Update Order Status
router.put("/update-order-status/:userId/:orderId/:orderStatus", updateOrderStatusController);

export default router;
