import Navbar from "@/components/Navbar";
import { NextAuthProvider } from "@/components/NextAuthProvider";
// import { NextAuthProvider } from "@/components/NextAuthProvider";
import { Toaster } from "@/components/ui/toaster";
import "@/styles/globals.css";

import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <NextAuthProvider>
          <Navbar />
          {children}
          <Toaster />
        </NextAuthProvider>
      </body>
    </html>
  );
}
