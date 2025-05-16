import type { Metadata } from "next";
import "./globals.css";
import { Suspense } from "react";
import { Poppins } from 'next/font/google';
import localFont from 'next/font/local';

const poppins = Poppins({
  weight: ['200', '300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
});

const layGroteskMedium = localFont({
  src: '../../public/fonts/LayGrotesk-Medium.otf',
  variable: '--font-lay-grotesk-medium',
  display: 'swap',
});

const layGroteskSemibold = localFont({
  src: '../../public/fonts/LayGrotesk-Semibold.otf',
  variable: '--font-lay-grotesk-semibold',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Relations",
  description: "Anliza tus llamadas y conviertelos en insights",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${poppins.variable} ${layGroteskMedium.variable} ${layGroteskSemibold.variable}`}>
      <body>
        <Suspense fallback={<div>Cargando...</div>}>
          {children}
        </Suspense>
      </body>
    </html>
  );
}
