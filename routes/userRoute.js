import { Router } from "express";
import {
  addUserAddressController,
  deleteUserAddressController,
  getUserAddressesController,
  getUserDataController,
  updateUserAddressController,
} from "../controllers/userController.js";
import { isAuthenticated } from "../services/common.js";

const router = Router();

//Get User Data
router.get("/own/info", isAuthenticated(), getUserDataController);

//Add User Address
router.post("/own/add-address", isAuthenticated(), addUserAddressController);

//Get User Address
router.get("/own/get-addresses", isAuthenticated(), getUserAddressesController);

//Delete User Address by  addressId
router.delete(
  "/own/delete-address/:addressId", isAuthenticated(),
  deleteUserAddressController
);

//Update User Address by  addressId
router.put(
  "/own/update-address/:addressId", isAuthenticated(),
  updateUserAddressController
);

export default router;
