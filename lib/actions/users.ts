"use server";
import { OnboardingFormSchema } from "~/lib/validators/onboarding.schema";
import { connectToDB } from "~/utils/database";
import User from "~/models/user";
import { getSession } from "~/auth/auth";

export async function updateUser(user: any) {
  try {
    OnboardingFormSchema.parse(user);
    await connectToDB();
    const session = await getSession();
    const sessionUser = session?.user;

    const updatedUser = await User.findOneAndUpdate(
      { _id: sessionUser?.id },
      {
        ...user,
        hasOnboarded: true,
        knowledgeLevels: user.knowledgeLevels.map((level: any) => {
          return level.value;
        }),
        techStack: user.techStack.map((tech: any) => {
          return tech.value;
        }),
        learningGoals: user.learningGoals.map((goal: any) => {
          return { done: goal.completed, goal: goal.value };
        }),
      },
      { new: true }
    );

    if (!updatedUser) {
      throw new Error("User not found");
    }
  } catch (err: any) {
    console.log(err);
    return err.errors;
  }
}

export async function getUser() {
  try {
    await connectToDB();
    const session = await getSession();
    const sessionUser = session?.user;

    const userFromDB = await User.findOne({ _id: sessionUser?.id });

    if (!userFromDB) {
      throw new Error("User not found");
    }

    return userFromDB;
  } catch (err: any) {
    console.log(err);
    return err.errors;
  }
}
