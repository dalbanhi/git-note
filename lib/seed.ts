console.log("Seed file running...");

require("dotenv").config({ path: `.env.local`, override: true });

import { connectToDB } from "~/utils/database";

async function seed() {
  await connectToDB();
}

seed();
