import { connect } from "mongoose";
import { config } from 'dotenv';

//configure dotenv
config()
const mongoUrl = process.env.MONGO_URL;

const dbConnect = async () => {
  try {
    await connect(mongoUrl);
  } catch (error) {
    console.error(
      `Something Went Wrong While Connecting To DB: `.bgRed.white,
      error.message
    );
  }
};

export default dbConnect
