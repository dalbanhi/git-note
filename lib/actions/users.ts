"use server";
import { OnboardingFormSchema } from "~/lib/validators/onboarding.schema";
import { connectToDB } from "~/utils/database";
import User from "~/models/user";
import { getSession } from "~/auth/auth";
import { unstable_cache as cache, revalidateTag } from "next/cache";
import { SocialMediaLink } from "~/types";
import { SocialLinksSchema } from "../validators/socialLinks.schema";

export async function updateLearningGoal(goal: string, completed: boolean) {
  try {
    await connectToDB();
    const session = await getSession();
    const sessionUser = session?.user;

    if (!sessionUser?.id) {
      throw new Error("User not authenticated");
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: sessionUser.id, "learningGoals.goal": goal },
      {
        $set: { "learningGoals.$.done": completed },
      },
      { new: true }
    );

    if (!updatedUser) {
      throw new Error("User or learning goal not found");
    }
  } catch (err: any) {
    console.log(err);
    return err.errors;
  }
}

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
        image: user.image,
        knowledgeLevels: user.knowledgeLevels.map((level: any) => {
          return level.value;
        }),
        techStack: user.techStack.map((tech: any) => {
          return tech.value;
        }),
        learningGoals: user.learningGoals.map((goal: any) => {
          return { done: goal.completed, goal: goal.value };
        }),
        scheduleAvailability: {
          startDate: user.startDate,
          endDate: user.endDate,
          available: user.availability,
        },
      },
      { new: true }
    );
    revalidateTag("user");

    if (!updatedUser) {
      throw new Error("User not found");
    }
  } catch (err: any) {
    console.log(err);
    return err.errors;
  }
}

async function _getUser(id: string) {
  try {
    await connectToDB();

    const userFromDB = await User.findOne({ _id: id });

    if (!userFromDB) {
      throw new Error("User not found");
    }

    return userFromDB;
  } catch (err: any) {
    console.log(err);
    return err.errors;
  }
}

export async function updateUserSocialLinks(socialLinks: any) {
  SocialLinksSchema.parse(socialLinks);
  try {
    await connectToDB();
    const session = await getSession();
    const sessionUser = session?.user;

    if (!sessionUser?.id) {
      throw new Error("User not authenticated");
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: sessionUser.id },
      {
        $set: { socialMediaLinks: socialLinks.socialLinks },
      },
      { new: true }
    );

    if (!updatedUser) {
      throw new Error("User not found");
    }

    revalidateTag("user");
    const updatedSocialLinks = updatedUser.socialMediaLinks;
    return JSON.parse(JSON.stringify(updatedSocialLinks));
  } catch (err: any) {
    console.log(err);
    return err.errors;
  }
}

async function _getUserSocialLinks(id: string) {
  try {
    await connectToDB();

    const userFromDB = await User.findOne({ _id: id });
    if (!userFromDB) {
      throw new Error("User not found");
    }

    const userSocials = userFromDB?.socialMediaLinks;
    //clean the object before returning
    const userLinks = JSON.parse(JSON.stringify(userSocials));
    return userLinks;
  } catch (err: any) {
    console.log(err);
    return err.errors;
  }
}

export const getUser = cache(_getUser, ["get-user"], {
  tags: ["user"],
});

export const getUserSocialLinks = cache(
  _getUserSocialLinks,
  ["get-user-social-links"],
  {
    tags: ["user"],
  }
);
