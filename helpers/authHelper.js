import { hash, compare } from "bcrypt";
import passport from "passport";
import nodemailer from "nodemailer";
import token from "crypto-token";

//Function for hashing the password
export const hashPassword = async (plainTextPassword) => {
  const saltRounds = 12;
  try {
    const hashedPassword = await hash(plainTextPassword, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.error("Error in the authHelper".bgRed.white, error);
  }
};

//function for comparing the password provided by the user while logging in and the password saved in database in hashed form
export const comparePassword = async (plainTextPassword, hashedPassword) => {
  try {
    const result = await compare(plainTextPassword, hashedPassword);
    return result;
  } catch (error) {
    console.error("Error in comparePassword function", error);
  }
};

//function for getting only userId and role specially for authentication purpose
export const sanitizeUser = (user) => {
  return { _id: user?._id, role: user?.role };
};

//function for authenticated user check
export const isAuthenticated = () => {
  return passport.authenticate("jwt");
};

//cookie extractor function
export const cookieExtractor = function (req) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["jwt"];
  }
  return token;
};

/*************For mail****************/
export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, //true for 465 false for other ports
  auth: {
    user: "minnathullahmohammed@gmail.com",
    pass: process.env.MAIL_PASSWORD,
  },
});

export const sendMail = async (to,subject, text, html) => {
  console.log(html);
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"WristWorthy E-commerce" <minnathullahmohammed@gmail.ocm>',
    to,
    subject ,
    text,
    html,
  });
  return info;
};

export const generateToken = async () => {
  try {
    const response = await token(52);
    return { success: true, token: response };
  } catch (error) {
    return { success: true, token: response, error: error.message };
  }
};
