import type { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { generateFromEmail, generateUsername } from "unique-username-generator";
import bcrypt from "bcryptjs";

import { Session, User as NextAuthUser } from "next-auth";

import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { connectToDB } from "~/utils/database";
import { DefaultSession } from "next-auth";

function removeAccents(str: string) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

declare module "next-auth" {
  interface User {
    name: string;
  }

  interface Session extends DefaultSession {
    user: User;
    hasOnboarded: boolean;
    image: string;
  }
}

import User from "~/models/user";

export const config = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_SECRET ?? "",
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
        fullName: {
          label: "Full Name",
          type: "text",
        },
      },
      async authorize(credentials, req) {
        //this should never happen due to the form validation
        if (credentials?.email === undefined || credentials?.password === "") {
          return null;
        }

        await connectToDB();
        //checking if a user already exists
        const userExistsAlready = await User.findOne({
          email: credentials.email,
        });

        //if user exists, check password
        if (userExistsAlready) {
          //check if the user even has a saved password
          if (userExistsAlready.password === undefined) {
            throw new Error(
              "User exists but no password saved. Maybe try logging in with Google or Github?"
            );
          }

          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            userExistsAlready.password
          );

          if (isPasswordCorrect) {
            return {
              name: userExistsAlready.name,
              email: userExistsAlready.email,
              image: userExistsAlready.imageURL,
              id: userExistsAlready._id.toString(),
            };
          } else {
            throw new Error("Incorrect password");
          }
        } else {
          //try to make a new user
          const uniqueUsername = generateFromEmail(credentials.email, 4);

          //check to see if the user is intending to log in or sign up
          if (credentials.fullName === "undefined") {
            //user is trying to log in but was not found, so throw an error
            throw new Error("User does not exist");
          }
          const newUser = await User.create({
            email: credentials.email,
            password: credentials.password,
            name: credentials.fullName,
            username: uniqueUsername,
          });

          return {
            name: newUser.name,
            email: newUser.email,
            image: newUser.image,
            id: newUser._id.toString(),
          };
        }
      },
    }),
  ],
  callbacks: {
    async session({ session }: { session: Session }) {
      await connectToDB();
      const sessionUser = await User.findOne({
        email: session?.user?.email ?? "",
      });

      if (sessionUser) {
        session.user.id = sessionUser._id.toString();
        session.hasOnboarded = sessionUser.hasOnboarded;
        session.image = sessionUser.image ?? "";
      }

      return session;
    },
    async signIn({ profile, credentials, account }) {
      //if already auth with credentials, skip
      if (account?.provider === "credentials") {
        return true;
      }

      try {
        await connectToDB();
        // checking if a user already exists
        const userExistsAlready = await User.findOne({
          email: profile?.email,
        });
        if (userExistsAlready) {
          return true;
        } else {
          const uniqueUsername = generateFromEmail(profile?.email ?? "", 4);
          const newUser = await User.create({
            email: profile?.email ?? "",
            name: profile?.name ?? "",
            username: uniqueUsername,
          });
        }

        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
  },
} satisfies NextAuthOptions;

export const getSession = async (context?: { req?: NextRequest }) => {
  return await getServerSession(config);
};
