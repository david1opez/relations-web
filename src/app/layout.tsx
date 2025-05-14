import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Relations",
  description: "Anliza tus llamadas y conviertelos en insights",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>
        {children}
      </body>
    </html>
  );
}
