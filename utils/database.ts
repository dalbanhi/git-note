import { set, connect } from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  set("strictQuery", true);

  if (isConnected) {
    console.log("Already connected");
    return;
  }

  try {
    await connect(process.env.MONGODB_URI ?? "", {
      dbName: process.env.MONGODB_DB,
    });
    isConnected = true;
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};
