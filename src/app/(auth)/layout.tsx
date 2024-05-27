import type { Metadata } from "next";
import React from "react";
import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import "../globals.css";
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
        className={`${inter.className} flex w-full items-center justify-center bg-myBlack-900 text-myWhite-100`}
      >
        <main className="flex min-h-screen w-1/2 flex-col items-center justify-center xl:w-3/5">
          <Link className="mb-6 mt-4 flex gap-2 text-display1" href={"/"}>
            <Image
              src="/icons/gitnote.svg"
              alt="GitNote"
              width={30}
              height={30}
            ></Image>
            <h1 className="text-display1 text-myWhite-100 ">GitNote</h1>
          </Link>
          <div className="flex w-full justify-center">{children}</div>
        </main>
      </body>
    </html>
  );
}
