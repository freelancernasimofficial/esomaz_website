import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/layout/Header";

const inter = Inter({ subsets: ["latin"] });
export const viewport: Viewport = {
  maximumScale: 1.0,
  userScalable: false,
};
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
      <body className={`${inter.className} bg-gray-100`}>
        <Header />
        <main className='pt-3'>{children}</main>
      </body>
    </html>
  );
}
