import mongoose from "mongoose";
import {} from "dotenv/config";

export const  connectDB = async () => {
  await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("MongoDB Connected");
    })
    .catch((err) => {
      console.log("Error in DB connection", err);
      process.exit(1);
    });
};
