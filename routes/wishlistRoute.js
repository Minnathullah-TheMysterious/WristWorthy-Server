import { Router } from "express";
import {
  addToWishlistController,
  deleteWishlistItemController,
  getWishlistController,
} from "../controllers/wishlistController.js";
import { isAuthenticated } from "../helpers/authHelper.js";

const router = Router();

//Create Or Add To Wishlist || POST
router.post("/user/add-to-wishlist/:productId", isAuthenticated(), addToWishlistController);

//Fetch Wishlist Items || GET
router.get("/user/get-wishlist", isAuthenticated(), getWishlistController);

//Delete WishList Items || DELETE
router.delete('/user/delete-wishlist-item/:productId', isAuthenticated(), deleteWishlistItemController)

export default router;
