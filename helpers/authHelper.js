import { hash, compare } from "bcrypt";

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

//function for comparing the password provided by the user while loggin in and the password saved in database in hashed form
export const comparePassword = async (plainTextPassword, hashedPassword) => {
  try {
    const result = await compare(plainTextPassword, hashedPassword);
    return result;
  } catch (error) {
    console.error("Error in comparePassword function", error);
  }
};
