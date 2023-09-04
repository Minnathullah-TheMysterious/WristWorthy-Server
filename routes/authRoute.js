import { Router } from "express";
import {
  loginController,
  reqResetPasswordController,
  protectedRouteController,
  registerController,
  addUserAddressController,
  verifyOtpController,
  getUserAddressesController,
  getUserDataController,
  resetPasswordController,
  deleteUserAddressController,
  updateUserAddressController,
} from "../controllers/authController.js";
import { isLoggedIn } from "../middlewares/authMiddleware.js";

//Enable Express Router
const router = Router();

//************Routing********* */
//Register
router.post("/register", registerController);

//Login
router.post("/login", loginController);

//Get User Data
router.get('/user-info/:userId', getUserDataController)

// Route to request OTP for password reset
router.post("/req-password-reset", reqResetPasswordController);

// Route to verify OTP
router.post("/verify-otp/:userId", verifyOtpController);

// Route to reset password
router.post("/reset-password/:userId", resetPasswordController);

//Add User Address by Id
router.post('/add-user-address/:userId', addUserAddressController)

//Get User Address by Id
router.get('/get-user-addresses/:userId', getUserAddressesController)

//Delete User Address by userId and addressId
router.delete('/delete-user-address/:userId/:addressId', deleteUserAddressController)

//Update User Address by userId and addressId
router.put('/update-user-address/:userId/:addressId', updateUserAddressController)

//Protected Route
router.get("/user-auth", isLoggedIn, (req, res) => {
  res.status(200).json({ ok: true });
});

//Private Route Testing
router.get("/protected", isLoggedIn, protectedRouteController);

export default router;
