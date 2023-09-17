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
router.post("/add-to-cart/:userId/:productId", addToCartController);

//Fetch All Cart Items
router.get("/get-cart-items/:userId", getCartItemsController);

//Delete A Cart Item
router.delete('/delete-cart-item/:userId/:productId', deleteCartItemController)

//Delete Cart
router.delete('/delete-cart/:userId', deleteCartController)

//Update Product Quantity
router.put('/update-product-quantity/:userId/:productId/:productQuantity', updateProductQuantityController)

export default router;
