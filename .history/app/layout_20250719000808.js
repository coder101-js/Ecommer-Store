// app/layout.tsx or app/layout.js

import "./globals.css";
import "./tailwind-out.css";
import { ThemeProvider } from "next-themes";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata = {
  title: "BoltForm",
  description: "Next-gen footwear built for speed ⚡",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="description" content="Next-gen footwear built for speed ⚡" />
        <meta name="keywords" content="shoes, footwear, speed, comfort, BoltForm" />
        <meta name="author" content="Wahb Amir" />
        <meta property="og:title" content="BoltForm - Next-gen Footwear" />
        <meta property="og:description" content="Step into lightning-fast comfort, built for  every move." />
        <meta property="og:image" content="/bolt-og-image.jpg" />
        <meta property="og:url" content="https://yourwebsite.com" />
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
