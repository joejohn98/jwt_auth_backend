import mongoose from "mongoose";
import dotenv from "dotenv";
import { log } from "node:console";

dotenv.config();

const MONGODB_URI = process.env.DATABASE_URI;

const connectDB = async (): Promise<void> => {
  if (!MONGODB_URI) {
    console.log("DATABASE URI is not defined in .env file");
    process.exit(1);
  }
  try {
    await mongoose.connect(MONGODB_URI as string);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("failed to connect DB", error);
    process.exit(1);
  }
};

export default connectDB;
