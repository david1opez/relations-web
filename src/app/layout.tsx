import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Relations",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/icon0.svg"/>
        <link rel="alternate icon" sizes="16x16" href="/favicon.ico"/>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
