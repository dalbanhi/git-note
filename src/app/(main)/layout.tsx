import type { Metadata } from "next";
import React from "react";
import { Inter } from "next/font/google";
import "../globals.css";

import LeftSidebar from "@components/shared/LeftSidebar/LeftSidebar";
import RightSidebar from "@components/shared/RightSidebar/RightSidebar";

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
  return (
    <html lang="en">
      <body
        className={`${inter.className} flex w-full items-center justify-center`}
      >
        <main className="flex min-h-screen w-full items-center justify-between xl:w-4/5">
          <LeftSidebar />
          {children}
          <RightSidebar />
        </main>
      </body>
    </html>
  );
}
