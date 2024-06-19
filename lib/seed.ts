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

async function makeNewPost(user: any) {
  let loremMarkdown = "";
  try {
    const response = await fetch(
      "https://jaspervdj.be/lorem-markdownum/markdown.txt"
    );
    loremMarkdown = await response.text();
  } catch (e) {
    console.log(e);
  }

  const type = faker.helpers.enumValue(NoteTypeEnum);

  let post: NoteType = {
    _id: "",
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
          codePreviewImage: faker.image.urlLoremFlickr({ category: "code" }),
        },
      };
      break;
    case NoteTypeEnum.Knowledge:
      post = {
        ...post,
        whatYouLearned: Array.from({ length: faker.number.int(5) }, () =>
          faker.hacker.phrase()
        ),
      };
      break;
    case NoteTypeEnum.Workflow:
      post = {
        ...post,
        stepsToFollow: Array.from({ length: faker.number.int(5) }, () =>
          faker.hacker.phrase()
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

  console.log("Making posts for the example user...");
  for (let i = 0; i < 5; i++) {
    await makeNewPost(user);
  }
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

// {
//   type: NoteType.Component,
//   title: "Search Command",
//   content:
//     "### Dic quaeque gaudent; \n[illas ambo](http://simulatoremque.org/), virgineos fulgebant vices et frondes [mortisneu](http://www.achaide.net/voluntas-virtute.php) tribus recipit: conloquiumquemagnaeque. Tamen illa pectore!",
//   description:
//     "A mobile navigation that seamlessly reveals a full-height sheet designed to effortlessly accommodate extensive menus.",
//   tags: ["Search Command"],
//   id: 8,
//   createdAt: new Date("2024-05-01"),
//   updatedAt: new Date("2024-05-01"),
//   numberOfStars: 10,
//   numberOfViews: 100,
//   code: {
//     code: "import cmd from 'search';",
//     codePreviewImage: "",
//   },
//   resourcesAndLinks: [
//     {
//       resource: "This is a resource",
//       url: "https://www.google.com",
//     },
//   ],
// },
