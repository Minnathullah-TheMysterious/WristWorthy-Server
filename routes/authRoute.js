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

//************Routing********* */
//Register
router.post("/register", registerController);

//Login
router.post("/login", loginController);

// Route to request OTP for password reset
router.post("/req-password-reset", passwordResetController);

// Route to verify OTP and reset password
router.post("/verify-otp-change-password", verifyOtpController);

//Protected Route
router.get("/user-auth", isLoggedIn, (req, res) => {
  res.status(200).json({ ok: true });
});

//Private Route Testing
router.get("/protected", isLoggedIn, protectedRouteController);

export default router;
