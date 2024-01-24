import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Link from "next/link";
import IconHomeFilled from "@/components/icons/IconHomeFilled";
import IconHomeOutline from "@/components/icons/IconHomeOutline";
import IconUsers from "@/components/icons/IconUsers";
import IconChat from "@/components/icons/IconChat";
import IconVideo from "@/components/icons/IconVideo";
import IconProject from "@/components/icons/IconProject";
import IconBriefcase from "@/components/icons/IconBriefcase";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Feeds | eSomaz",
  description: "The virtual society",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${inter.className} dark bg-gray-50`}>
        <Header />
        <main className='pt-3'>{children}</main>
      </body>
    </html>
  );
}
