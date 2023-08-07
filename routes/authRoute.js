import { Router } from "express";
import {
  loginController,
  passwordResetController,
  protectedRouteController,
  registerController,
  verifyOtpController,
} from "../controllers/authController.js";
import { isLoggedIn } from "../middlewares/authMiddleware.js";

//Enable Express Router
const router = Router();

//Register
router.post("/register", registerController);

//Login
router.post("/login", loginController);

// Route to request OTP for password reset
router.post('/password-reset', passwordResetController)

// Route to verify OTP and reset password
router.post('/verify-otp', verifyOtpController)

//Private Route Testing
router.get("/protected", isLoggedIn, protectedRouteController);


export default router;
