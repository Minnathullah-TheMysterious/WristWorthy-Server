import { Router } from "express";
import {
  addToWishlistController,
  deleteWishlistItemController,
  getWishlistController,
} from "../controllers/wishlistController.js";

const router = Router();

//Create Or Add To Wishlist || POST
router.post("/add-to-wishlist/:userId/:productId", addToWishlistController);

//Fetch Wishlist Items || GET
router.get("/get-wishlist/:userId", getWishlistController);

//Delete WishList Items || DELETE
router.delete('/delete-wishlist-item/:userId/:productId', deleteWishlistItemController)

export default router;
