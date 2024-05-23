import NextAuth from "next-auth/next";
import { Session, User as NextAuthUser } from "next-auth";

import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { connectToDB } from "~/utils/database";

import User from "~/models/user";

function removeAccents(str: string) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_SECRET ?? "",
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
    async signIn({ profile }) {
      try {
        await connectToDB();
        //checking if a user already exists
        const userExistsAlready = await User.findOne({
          email: profile?.email,
        });

        if (!userExistsAlready) {
          //handle the case where the user does not have a name/ if it is done by the google provider, the github provider, or the email provider
          let uniqueUsername = profile?.email?.split("@")[0];
          uniqueUsername = removeAccents(uniqueUsername || "");

          while (await User.findOne({ username: uniqueUsername })) {
            uniqueUsername += Math.floor(Math.random() * 10);
          }
          //make sure username is at least 8 characters long
          while (uniqueUsername.length < 8) {
            uniqueUsername += Math.floor(Math.random() * 10);
          }

          // //make sure username is at most 30 characters long
          uniqueUsername = uniqueUsername.slice(0, 30);

          await User.create({
            email: profile?.email,
            username: uniqueUsername,
            image: (profile as { picture?: string })?.picture,
          });
        }

        return true;
      } catch (e) {
        console.log("Error signing in!!! :-( ");
        console.log(e);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
