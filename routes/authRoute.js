import { Router } from "express";
import passport from "passport";
import {
  loginController,
  reqResetPasswordController,
  registerController,
  verifyOtpController,
  resetPasswordController,
  logoutController,
  reqResetPasswordMailController,
  resetPasswordMailController,
} from "../controllers/authController.js";
import { isAdmin, isLoggedIn } from "../middlewares/authMiddleware.js";
import { isAuth } from "../middlewares/authMiddleware.js";
import { isAuthenticated } from "../helpers/authHelper.js";

//Enable Express Router
const router = Router();

//Register
router.post("/register", registerController);

//Login
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/",
  }),
  loginController
);

// Route to request OTP for password reset
router.post("/req-password-reset", reqResetPasswordController);

// Password Reset Request Via mail
router.post("/req-password-reset-mail", reqResetPasswordMailController);

// Route to verify OTP
router.post("/verify-otp/:userId", verifyOtpController);

// Route to reset password
router.post("/reset-password/:userId", resetPasswordController);

// Route to reset password Via Mail
router.post("/reset-password", resetPasswordMailController);

// Logout
router.post("/logout", logoutController);

//User Protected Route
router.get("/authenticate-user", isAuthenticated(), (req, res) => {
  res.status(200).json({ ok: true });
});

//Admin Protected Route
router.get("/authenticate-admin", isAuthenticated(), isAdmin, (req, res) => {
  res.status(200).json({ ok: true });
});

/***************************TESTING********************* */
//Private route for admin *****Testing*********
router.get("/admin-route", isLoggedIn, isAdmin, (req, res) => {
  res.status(200).json({ success: true, message: "Admin Protected route" });
});

//Private Route for LoggedIn user ******* Testing *********
router.get("/protected", isLoggedIn, (req, res) => {
  res.status(200).json({ success: true, message: "Protected Route" });
});

//Check for Logged in user *****Testing*********
router.get("/logged-in-user-check-local-strategy", isAuth, (req, res) => {
  res
    .status(200)
    .json({ success: true, message: "Logged In User", user: req.user });
});

//Verify JWT *****Testing*********
router.get("/verify-jwt", isAuthenticated(), (req, res) => {
  res
    .status(200)
    .json({ success: true, message: "Logged In User", user: req.user });
});

export default router;
