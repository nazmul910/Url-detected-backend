import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) return; 

  try {
    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
    console.log("MongoDB Connected ✅");
  } catch (error) {
    console.error("DB Error:", error.message);
    throw error;
  }
};