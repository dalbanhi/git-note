import type { Metadata } from "next";
import React from "react";
import { Inter } from "next/font/google";
// import "../globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Git Note",
  description: "An knowledge repository for software developers.",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} flex w-full items-center justify-center`}
      >
        <main className="flex min-h-screen w-full items-center justify-between xl:w-3/5">
          {children}
        </main>
      </body>
    </html>
  );
}
