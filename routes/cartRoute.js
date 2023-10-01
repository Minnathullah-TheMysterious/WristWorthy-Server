import { Router } from "express";
import {
  addToCartController,
  deleteCartController,
  deleteCartItemController,
  getCartItemsController,
  updateProductQuantityController,
} from "../controllers/cartController.js";

const router = Router();

//create cart or add to cart
router.post("/user/add-to-cart/:productId", addToCartController);

//Fetch user Cart Items
router.get("/user/get-cart-items", getCartItemsController);

//Delete A Cart Item
router.delete('/user/delete-cart-item/:productId', deleteCartItemController)

//Delete Cart
router.delete('/user/delete-cart', deleteCartController)

//Update Product Quantity
router.put('/user/update-product-quantity/:productId/:productQuantity', updateProductQuantityController)

export default router;
