import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

import LeftSidebar from "@/components/shared/LeftSidebar/LeftSidebar";
import RightSidebar from "@/components/shared/RightSidebar/RightSidebar";
import { getSession } from "~/auth/auth";
import { redirect } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Git Note",
  description: "An knowledge repository for software developers.",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = getSession();
  if (!session) {
    redirect("/sign-in");
  }
  return (
    <html lang="en">
      <body
        className={`${inter.className} flex w-full items-center justify-center bg-myBlack-900 text-myWhite-100`}
      >
        <main className="flex min-h-screen w-full justify-between xl:w-4/5">
          <LeftSidebar />
          {children}
          <RightSidebar />
        </main>
      </body>
    </html>
  );
}
