import { Schema, model } from "mongoose";
import speakeasy from "speakeasy";
import { hashPassword } from "../helpers/authHelper.js";

const userSchema = new Schema(
  {
    user_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    confirm_password: {
      type: String,
    },
    addresses: [
      {
        firstName: String,
        lastName: String,
        emailAddress: String,
        mobileNumber: String,
        altMobileNumber: String,
        country: String,
        street: String,
        city: String,
        state: String,
        pinCode: String,
        dist: String,
        mandal: String,
        village: String,
      },
    ],
    role: { type: String, default: "user" },
    otpSecret: { type: String }, // Store the OTP secret here
  },
  { timestamps: true }
);

// Generate and set the otpSecret before saving a new user //This is a mongoose middleware

userSchema.pre("save", async function (next) {
  if (!this.otpSecret) {
    this.otpSecret = speakeasy.generateSecret().base32;
  }

  // Hash the otpSecret before saving it to the database
  try {
    const hashedOtpSecret = await hashPassword(this.otpSecret);
    this.otpSecret = hashedOtpSecret;
    next();
  } catch (error) {
    console.error("Error in hashing the otpSecret".bgRed.white, error);
  }
});

const userModel = model("user", userSchema);
export default userModel;
