import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";
import twilio from "twilio";
import speakeasy from "speakeasy";

// ***************Register || POST**************/
export const registerController = async (req, res) => {
  try {
    const { user_name, email, password, phone, confirm_password } = req.body;
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
    if (!confirm_password) {
      return res.status(400).json({
        success: false,
        message: "Please Confirm Your Password",
      });
    }

    //Match the password and confirm_password weather they are identical or not
    if (password !== confirm_password) {
      return res.status(400).json({
        success: false,
        message: "Passwords does not match",
      });
    }

    //find weather the user already exists with the given emil or not
    const existingUserWithEmail = await userModel.findOne({ email });

    //find weather the user already exists with the given phone number or not
    const existingUserWithPhone = await userModel.findOne({ phone });

    if (existingUserWithEmail) {
      return res.status(409).json({
        success: false,
        message: "Email is already registered, Please Login",
      });
    } else if (existingUserWithPhone) {
      return res.status(409).json({
        success: false,
        message: "Phone number is already registered. Please login",
      });
    } else {
      //Hash the password
      const hashedPassword = await hashPassword(password);
      const data = new userModel({
        user_name,
        email,
        password: hashedPassword,
        phone,
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
      error: error.message,
    });
    console.error("Something Went Wrong While Registering".bgRed.white, error);
  }
};

//*************Login || POST***************** */
export const loginController = async (req, res) => {
  try {
    const { email, phone, password } = req.body;
    //validation
    if (!email && !phone) {
      return res
        .status(400)
        .json({ success: false, message: "Email or Phone is Required" });
    }
    if (!password) {
      return res
        .status(400)
        .json({ success: false, message: "Password is Required" });
    }

    //Check for the user by email weather exists or not
    const user = await userModel.findOne({
      $or: [{ email }, { phone }],
    });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
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
    console.log("User Validation start for password reset");
    //Validation
    if (!phone) {
      return res
        .status(400)
        .json({ success: false, message: "Phone number is required" });
    }

    console.log(`User Validation Done`);

    //Checking for user with the given phone number
    const user = await userModel.findOne({ phone });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    } else {
      console.log(`User Found`);

      // Generate OTP using the secret for the user
      const token = speakeasy.totp({
        secret: user.otpSecret,
        encoding: "base32",
      });

      console.log(`OTP Generated`);

      // Create a Twilio client instance
      const twilioClient = twilio(accountSid, authToken);

      console.log(`Twilio Account Created`);

      // Send OTP via SMS
      await twilioClient.messages
        .create({
          body: `Your OTP for password reset: ${token}`,
          from: twilioPhoneNumber,
          to: user.phone,
        })
        .then(() => {
          console.log(`OTP sent to client Successfully`);
          res
            .status(200)
            .json({ success: true, message: "OTP sent successfully" });
        })
        .catch((error) => {
          console.error("Error sending OTP:".bgRed.white, error);
          return res
            .status(500)
            .json({ success: false, message: "Failed To Send OTP", error });
        });
    }
  } catch (error) {
    console.error(
      "Something Went Wrong in passwordResetController".bgRed.white,
      error
    );
    res.status(500).json({
      success: false,
      message: "Something Went Wrong in Resetting the Password",
      error,
    });
  }
};

/****************Verify OTP || POST******** */
export const verifyOtpController = async (req, res) => {
  try {
    //validation
    const { phone, otp, newPassword, confirmNewPassword } = req.body;
    switch (true){
      case !phone : return res.status(400).json({success: false, message: 'Registered Phone number is required'})
      case !otp : return res.status(400).json({success: false, message: 'OTP is required'})
      case !newPassword : return res.status(400).json({success: false, message: 'New Password is required'})
      case !confirmNewPassword : return res.status(400).json({success: false, message: 'Confirm New Password is required'})
    }

    const user = await userModel.findOne({ phone });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    } else {
      // Verify OTP using the secret for the user
      const isValidOTP = speakeasy.totp.verify({
        secret: user.otpSecret,
        encoding: "base32",
        token: otp,
        window: 1,
      });
      if (!isValidOTP) {
        return res.status(401).json({ success: false, message: "Invalid OTP" });
      } else {
        if (newPassword !== confirmNewPassword) {
          return res
            .status(400)
            .json({ success: false, message: "Passwords does not match" });
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
            res.status(500).json({
              success: true,
              message: "Something went wrong in updating the new password",
              error,
            });
          }
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
