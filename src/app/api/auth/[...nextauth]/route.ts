import NextAuth from "next-auth/next";
import { config } from "~/auth/auth";

const handler = NextAuth(config);

export { handler as GET, handler as POST };
