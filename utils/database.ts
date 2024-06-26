import { set, connect } from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  set("strictQuery", true);

  if (isConnected) {
    // console.log("mongo db is already connected");
    return;
  }

  try {
    await connect(process.env.MONGODB_URI ?? "", {
      dbName: process.env.MONGODB_DB,
    });
    isConnected = true;
    console.log("mongo db connected");
  } catch (error) {
    console.log(error);
  }
};
