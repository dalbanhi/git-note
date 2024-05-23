import { set, connect } from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  set("strictQuery", true);

  if (isConnected) {
    console.log("mongo db is already connected");
    return;
  }

  try {
    connect(process.env.MONGODB_URI ?? "", {
      dbName: process.env.MONGODB_DB,
    }).then((response) => {
      isConnected = true;
      console.log("mongodb connected");
    });
  } catch (error) {
    console.log(error);
  }
};
