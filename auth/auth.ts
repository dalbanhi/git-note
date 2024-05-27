import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import type { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth";

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
  }
}

import User from "~/models/user";
import NextAuth from "next-auth/next";

// You'll need to import and pass this
// to `NextAuth` in `app/api/auth/[...nextauth]/route.ts`
export const config = {
  providers: [
    // GithubProvider({
    //   clientId: process.env.GITHUB_ID ?? "",
    //   clientSecret: process.env.GITHUB_SECRET ?? "",
    // }),
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
      },
      async authorize(credentials, req) {
        //where you connect and verify credentials
        console.log("trying to auth");
        console.log("credentials, ", credentials);
        console.log("req, ", req);

        return {
          name: "John Doe",
          email: "email@email.com",
          image: "",
          id: "1",
        };
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
        //checking if a user already exists
        const userExistsAlready = await User.findOne({
          email: profile?.email,
        });

        // if (!userExistsAlready) {
        //   //handle the case where the user does not have a name/ if it is done by the google provider, the github provider, or the email provider
        //   let uniqueUsername = profile?.email?.split("@")[0];
        //   uniqueUsername = removeAccents(uniqueUsername || "");

        //   while (await User.findOne({ username: uniqueUsername })) {
        //     uniqueUsername += Math.floor(Math.random() * 10);
        //   }
        //   //make sure username is at least 8 characters long
        //   while (uniqueUsername.length < 8) {
        //     uniqueUsername += Math.floor(Math.random() * 10);
        //   }

        //   // //make sure username is at most 30 characters long
        //   uniqueUsername = uniqueUsername.slice(0, 30);

        //   await User.create({
        //     email: profile?.email,
        //     username: uniqueUsername,
        //     image: (profile as { picture?: string })?.picture,
        //   });
        // }

        return true;
      } catch (e) {
        console.log("Error signing in!!! :-( ");
        console.log(e);
        return false;
      }
    },
  },
} satisfies NextAuthOptions;

export const getSession = async () => await getServerSession(config);
