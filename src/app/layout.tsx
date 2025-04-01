import "./globals.css";
import type { Metadata } from "next";
import ProfileIcon from "@/components/MyProfile/ProfileIcon";

export const metadata: Metadata = {
  title: "Tu App",
  description: "Descripción...",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div style={{ position: "absolute", top: "20px", right: "20px" }}>
          <ProfileIcon />
        </div>
        {children}
      </body>
    </html>
  );
}