import { hash, compare } from "bcrypt";
import passport from "passport";

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
export const cookieExtractor = function(req) {
  let token = null;
  if (req && req.cookies) {
      token = req.cookies['jwt'];
  }
  /*****************TODO: This is temporary token for testing without cookie**********/
  // token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGQ5Y2JmZWZkMjEwZWYzODllMjY4OTgiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2OTYxNDI1NjIsImV4cCI6MTY5Njc0NzM2Mn0.C11iOd9a_Yod4fDO35Q0t4jK2b5Xv9zH69tjOYKfPQ8"
  return token;
};
