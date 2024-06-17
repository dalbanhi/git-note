console.log("Seed file running...");

const { set, connect } = require("mongoose");
require("dotenv").config({ path: `.env.local`, override: true });

let isConnected = false;

const connectToDB = async () => {
  set("strictQuery", true);

  if (isConnected) {
    console.log("mongo db is already connected");
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

async function main() {
  await connectToDB();
}

main();
