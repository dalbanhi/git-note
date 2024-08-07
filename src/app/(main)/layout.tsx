import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

import LeftSidebar from "@/components/shared/LeftSidebar/LeftSidebar";
import RightSidebar from "@/components/shared/RightSidebar/RightSidebar";
import MobileNav from "@/components/shared/MobileNav/MobileNav";

const inter = Inter({ subsets: ["latin"] });
import ToastProvider from "~/lib/providers/ToastProvider";
import type { Viewport } from "next";

export const metadata: Metadata = {
  title: "Git Note",
  description: "An knowledge repository for software developers.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="dark" lang="en">
      <body
        className={`${inter.className} flex w-full items-center justify-center bg-myBlack-900 text-myWhite-100`}
      >
        <main className="flex min-h-screen w-full max-sm:flex-col max-sm:items-center md:justify-between xl:w-4/5">
          <MobileNav />
          <LeftSidebar />
          <ToastProvider>{children}</ToastProvider>
          <RightSidebar />
        </main>
      </body>
    </html>
  );
}
