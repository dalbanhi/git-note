import NextAuth from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's name. */
      id: string;
      email?: string | null;
      username?: string | null;
      password?: string | null;
      image?: string | null;
    };
  }
}
