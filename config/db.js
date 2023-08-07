import { connect } from "mongoose";
import { config } from 'dotenv';

//configure dotenv
config()
const mongoUrl = process.env.MONGO_URL;

const dbConnect = async () => {
  try {
    await connect(mongoUrl);
    console.log(
      `Connected to Database (${mongoUrl}) Successfully`.bgGreen.white
    );
  } catch (error) {
    console.log(
      `Something Went Wrong While Connection To DB`.bgRed.white,
      error
    );
  }
};

export default dbConnect
