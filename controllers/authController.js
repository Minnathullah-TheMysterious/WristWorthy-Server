import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";
import twilio from "twilio";
import speakeasy from "speakeasy";

// ***************Register || POST**************/
export const registerController = async (req, res) => {
  try {
    const { user_name, email, password, phone, address } = req.body;
    //validation
    if (!user_name) {
      return res.status(400).json({
        success: false,
        message: "Please Provide Your Name",
      });
    }
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Please Provide Your Email",
      });
    }
    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Please Create Your Password",
      });
    }
    if (password.length < 5) {
      return res.status(400).json({
        success: false,
        message: "Password Must be of 5 Characters Long",
      });
    }
    if (!phone) {
      return res.status(400).json({
        success: false,
        message: "Please Provide Your Phone Number",
      });
    }
    if (!address) {
      return res.status(400).json({
        success: false,
        message: "Please Provide Your Address",
      });
    }

    //find weather the user already exists or not
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Already Registered With the Same Email, Please Login",
      });
    } else {
      //Hash the password
      const hashedPassword = await hashPassword(password);
      const data = new userModel({
        user_name,
        email,
        password: hashedPassword,
        phone,
        address,
      });
      const user = await data.save();
      console.log(user);
      res
        .status(201)
        .json({ success: true, message: "User Registered Successfully", user });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something Went Wrong While Registering",
      error,
    });
    console.error("Something Went Wrong While Registering".bgRed.white, error);
  }
};

//*************Login || POST***************** */
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is Required" });
    }
    if (!password) {
      return res
        .status(400)
        .json({ success: false, message: "Password is Required" });
    }

    //Check for the user weather exists or not
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found, Email is not Registered",
      });
    } else {
      const match = await comparePassword(password, user.password);
      if (!match) {
        return res
          .status(401)
          .json({ message: "Invalid Password", success: false });
      } else {
        // User is found and authenticated, generate a JWT
        const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, {
          expiresIn: "3d",
        });
        res.status(200).json({
          token,
          message: "LoggedIn Successfully",
          success: true,
          user: {
            _id: user._id,
            user_name: user.user_name,
            email: user.email,
            phone: user.phone,
            address: user.address,
          },
        });
      }
    }
  } catch (error) {
    console.error("Error in Login".bgRed.white, error);
    res.status(500).json({ success: false, message: "Error in Login" });
  }
};

/***************Reset Password*********** */
export const passwordResetController = async (req, res) => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

  try {
    const { phone } = req.body;
    const user = await userModel.findOne({ phone });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found", error });
    }

    // Generate OTP using the secret for the user
    const token = speakeasy.totp({
      secret: user.otpSecret,
      encoding: "base32",
    });

    // Create a Twilio client instance
    const twilioClient = twilio(accountSid, authToken);

    // Send OTP via SMS
    twilioClient.messages
      .create({
        body: `Your OTP for password reset: ${token}`,
        from: twilioPhoneNumber,
        to: user.phone,
      })
      .then(() => {
        res
          .status(200)
          .json({ success: true, message: "OTP sent successfully" });
      })
      .catch((error) => {
        console.error("Error sending OTP:".bgRed.white, error);
        res
          .status(500)
          .json({ success: false, message: "Failed To Send OTP", error });
      });
  } catch (error) {
    console.error(
      "Something Went Srong in passwordResetController".bgRed.white,
      error
    );
    res.status(500).json({
      success: false,
      message: "Something Went Srong in Resetting the Password",
      error,
    });
  }
};

/****************Verify OTP || POST******** */
export const verifyOtpController = async (req, res) => {
  try {
    const { phone, otp, newPassword } = req.body;
    const user = await userModel.findOne({ phone });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found", error });
    } else {
      // Verify OTP using the secret for the user
      const isValidOTP = speakeasy.totp.verify({
        secret: user.otpSecret, 
        encoding: "base32",
        token: otp,
        window: 1, 
      });
      if (!isValidOTP) {
        return res
          .status(401)
          .json({ success: false, message: "Invalid OTP", error });
      } else {
        try {
          const hashedPassword = await hashPassword(newPassword);
          const updatedUser = await userModel.findByIdAndUpdate(
            { _id: user._id },
            { $set: { password: hashedPassword } }
          );
          res.json({
            success: true,
            message: "Password reset successful",
            updatedUser,
          });
        } catch (error) {
          console.error(
            "Something went wrong in updating the new password".bgRed.white,
            error
          );
          res
            .status(500)
            .json({
              success: true,
              message: "Something went wrong in updating the new password",
              error,
            });
        }
      }
    }
  } catch (error) {
    console.error(
      "Something Went Wrong in verifyOtpController".bgRed.white,
      error
    );
    res.status(500).json({
      success: false,
      message: "Something Went Wrong While verifying the OTP",
      error,
    });
  }
};

//**********************Protected Route Testing || GET********* */
export const protectedRouteController = (req, res) => {
  res.status(200).json({ success: true, message: "Protected Route" });
};
