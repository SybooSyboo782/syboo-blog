import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="bg-gray-800 text-white p-4">
          <Link href={`/`}>
            <h1 className="text-2xl">시부시부의 블로그</h1>
          </Link>
        </header>
        {children}
        <footer className="text-center py-4 text-sm">
          © 2024 Syboo Blog. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
