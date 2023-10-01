import { Router } from "express";
import {
  cancelOrderController,
  getAllFilteredOrdersController,
  getOrderByIdController,
  getUserOrdersController,
  placeOrderController,
  updateOrderStatusController,
} from "../controllers/orderController.js";
import { isAuthenticated } from "../helpers/authHelper.js";
import { isAdmin } from "../middlewares/authMiddleware.js";

const router = Router();

//Place Order
router.post("/user/place-order", isAuthenticated(), placeOrderController);

//Fetch User Orders
router.get("/user/get-orders", isAuthenticated(), getUserOrdersController);

//Fetch all/Filtered Orders
router.get(
  "/admin/get-all-filtered-orders",
  isAuthenticated(),
  isAdmin,
  getAllFilteredOrdersController
);

//Fetch Order By Id
router.get(
  "/admin/get-order-details/:orderId",
  isAuthenticated(),
  isAdmin,
  getOrderByIdController
);

//Update Order Status
router.put(
  "/admin/update-order-status/:orderId/:status",
  isAuthenticated(),
  isAdmin,
  updateOrderStatusController
);

//Cancel Order
router.put(
  "/user/cancel-order/:orderId",
  isAuthenticated(),
  cancelOrderController
);

export default router;
