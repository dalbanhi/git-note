console.log("Seed file running...");

require("dotenv").config({ path: `.env.local`, override: true });

import { connectToDB } from "~/utils/database";
import User from "~/models/User";
import { faker } from "@faker-js/faker";
import { generateFromEmail, generateUsername } from "unique-username-generator";

import { TechStackOptions } from "~/constants";

async function onboardAUser(user: any, image: string = "") {
  let knowledgeLevels = [];
  for (let i = 0; i < faker.number.int(5); i++) {
    knowledgeLevels.push(faker.lorem.sentence({ min: 3, max: 5 }) as string);
  }
  let techStack = [];
  for (let i = 0; i < faker.number.int(5); i++) {
    techStack.push(faker.helpers.arrayElement(TechStackOptions) as string);
  }

  let learningGoals = [];
  for (let i = 0; i < faker.number.int(7); i++) {
    learningGoals.push({
      goal: faker.lorem.sentence({ min: 3, max: 5 }),
      done: faker.datatype.boolean(),
    });
  }

  try {
    await User.findOneAndUpdate(
      { _id: user._id },
      {
        // ...user,
        hasOnboarded: true,
        image: image === "" ? faker.image.avatar() : image,
        portfolio: faker.internet.url(),
        location: faker.location.city() + ", " + faker.location.country(),
        knowledgeLevels: knowledgeLevels,
        techStack: techStack,
        learningGoals: learningGoals,
        scheduleAvailability: {
          startDate: faker.date.recent(),
          endDate: faker.date.soon(),
          available: faker.datatype.boolean(),
        },
      }
      // { new: true }
    );
  } catch (e) {
    console.log(e);
  }
}

async function makeRandomUsers(num: number) {
  for (let i = 0; i < num; i++) {
    const email = faker.internet.email();
    const uniqueUsername = generateFromEmail(email ?? "", 4);

    const user = await User.create({
      email: email,
      password: faker.internet.password(),
      name: faker.person.fullName(),
      username: uniqueUsername,
    });
    let shouldOnboard = faker.datatype.boolean();

    if (shouldOnboard) {
      console.log("creating an onboarded user");
      await onboardAUser(user);
    }
  }
}

async function makeExampleUser() {
  const name = {
    firstName: "Sirius",
    lastName: "Black",
  };
  const email = "sirius.black@hogwarts.edu";
  const uniqueUsername = generateFromEmail(email ?? "", 4);
  const user = await User.create({
    email: email,
    password: "123123",
    name: name.firstName + " " + name.lastName,
    username: uniqueUsername,
  });

  await onboardAUser(
    user,
    "https://utfs.io/f/bbedbcdd-64ed-48b3-aa7b-8d7162545bc1-mg50ir.jpeg"
  );
}

async function seed() {
  await connectToDB();
  const allUsers = await User.find();
  await User.deleteMany({});
  console.log("All users cleared");
  await makeRandomUsers(5);
  console.log("5 random users created");
  await makeExampleUser();
}

seed();
