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
router.get('/user-info/:uId', getUserDataController)

// Route to request OTP for password reset
router.post("/req-password-reset", reqResetPasswordController);

// Route to verify OTP
router.post("/verify-otp/:uId", verifyOtpController);

// Route to reset password
router.post("/reset-password/:uId", resetPasswordController);

//Protected Route
router.get("/user-auth", isLoggedIn, (req, res) => {
  res.status(200).json({ ok: true });
});

//Update User Address by Id
router.post('/add-user-address/:uId', isLoggedIn, addUserAddressController)

//Get User Address by Id
router.get('/get-user-addresses/:uId', getUserAddressesController)

//Private Route Testing
router.get("/protected", isLoggedIn, protectedRouteController);

export default router;
