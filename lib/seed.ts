console.log("Seed file running...");

require("dotenv").config({ path: `.env.local`, override: true });

import { connectToDB } from "~/utils/database";
import User from "~/models/user";
import { NoteType as NoteTypeEnum } from "~/constants";
import { Note as NoteType } from "~/types";

import { faker } from "@faker-js/faker";
import { generateFromEmail } from "unique-username-generator";

import { TechStackOptions } from "~/constants";
import Note from "~/models/note";

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
      await onboardAUser(user);
    }
  }
}

async function relatePostsToEachOther(user: any) {
  //get all the posts for the user
  const posts = await Note.find({ creator: user._id });

  //local hash table to store the related notes
  const relatedNotes = posts.reduce(
    (acc, post) => {
      acc[post._id] = [];
      return acc;
    },
    {} as { [key: string]: string[] }
  );

  // for each post, relate it to another random post (if possible)
  for (let post of posts) {
    const randomPosts = await Note.aggregate([
      { $match: { id: { $ne: post._id } } },
      { $sample: { size: 1 } },
    ]);
    const randomPost = randomPosts[0];
    const postID: string = post._id.toString() as string;
    const randomPostID: string = randomPost?._id.toString() as string;
    const relatedInPost = relatedNotes[postID].includes(randomPostID);
    const relatedInRandomPost = relatedNotes[randomPostID].includes(postID);
    //check that the random post is not already related to the original post
    if (randomPost && !relatedInPost && !relatedInRandomPost) {
      await Note.findOneAndUpdate(
        { _id: post._id },
        { $push: { relatedNotes: randomPost._id } }
      );
      //relate the random post to the original post
      await Note.findOneAndUpdate(
        { _id: randomPost._id },
        { $push: { relatedNotes: post._id } }
      );

      //add to quick hash table
      relatedNotes[post._id].push(randomPostID);
      relatedNotes[randomPost._id].push(postID);
    }
  }
}

async function makePostsForUser(user: any, num: number) {
  let typeNum = {
    component: 0,
    knowledge: 0,
    workflow: 0,
  };
  for (let i = 0; i < num; i++) {
    let typeMade = await makeNewPost(user, typeNum);
    if (typeMade) {
      typeNum[typeMade]++;
    }
  }
}

async function makeNewPost(user: any, typeNum: { [key: string]: number }) {
  let loremMarkdown = "";
  try {
    const response = await fetch(
      "https://jaspervdj.be/lorem-markdownum/markdown.txt"
    );
    loremMarkdown = await response.text();
  } catch (e) {
    console.log(e);
  }

  let type;
  //if all the values in the typeNum object are 0, pick a random type
  if (Object.values(typeNum).every((val) => val === 0)) {
    type = faker.helpers.enumValue(NoteTypeEnum);
  }
  //if there are still types with 0, pick one of those
  else if (Object.values(typeNum).some((val) => val === 0)) {
    let types = Object.keys(typeNum).filter((key) => typeNum[key] === 0);
    type = faker.helpers.arrayElement(types);
  }
  //if all types have been made, pick a random type
  else {
    type = faker.helpers.enumValue(NoteTypeEnum);
  }

  let post: NoteType = {
    type: type,
    title: faker.company.catchPhrase(),
    content: loremMarkdown,
    description:
      faker.company.catchPhrase() +
      " to " +
      faker.company.buzzVerb() +
      " and " +
      faker.company.buzzPhrase(),
    tags: Array.from({ length: faker.number.int(7) }, () =>
      faker.hacker.noun()
    ),
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
    stars: faker.number.int(500),
    views: faker.number.int(5000),
    resourcesAndLinks: [
      {
        resource: faker.company.buzzPhrase(),
        url: faker.internet.url(),
      },
    ],
    creator: user._id,
  };
  //add to post based on type
  switch (type) {
    case NoteTypeEnum.Component:
      post = {
        ...post,
        code: {
          code: "import cmd from 'search';",
          codePreviewImage: faker.image.urlLoremFlickr({
            category: "programming",
          }),
        },
      };
      break;
    case NoteTypeEnum.Knowledge:
      post = {
        ...post,
        whatYouLearned: Array.from(
          { length: faker.number.int({ min: 1, max: 7 }) },
          () => faker.company.buzzPhrase()
        ),
      };
      break;
    case NoteTypeEnum.Workflow:
      post = {
        ...post,
        stepsToFollow: Array.from(
          { length: faker.number.int({ min: 1, max: 7 }) },
          () =>
            faker.hacker.verb() +
            " " +
            faker.hacker.adjective() +
            " " +
            faker.hacker.noun()
        ),
      };
      break;
    default:
      return;
  }

  try {
    const newNote = await Note.create({
      ...post,
    });

    await User.findOneAndUpdate(
      { _id: user.id },
      { $push: { notes: newNote.id } }
    );
  } catch (e) {
    console.log(e);
  }

  return type;
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

  console.log("Example user created.");
  const postsToMake = faker.number.int({ min: 5, max: 10 });
  console.log(`Making ${postsToMake} posts for the example user...`);
  await makePostsForUser(user, postsToMake);

  console.log("Relating posts to each other...");
  await relatePostsToEachOther(user);
}

async function seed() {
  await connectToDB();
  await User.deleteMany({});
  await Note.deleteMany({});
  console.log("All users and notes cleared");
  await makeRandomUsers(5);
  console.log("5 random users created");
  await makeExampleUser();
  console.log("Example user created");
  console.log("Seed completed");
}

seed();
