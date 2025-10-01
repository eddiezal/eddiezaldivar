import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";
import { playfair, nunito } from "./fonts";

export const metadata: Metadata = {
  title: "eddiezaldivar.com",
  description: "Fractional growth & AI",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <head>
        <Script
          defer
          data-domain="eddiezaldivar.com"
          src="https://plausible.io/js/script.js"
        />
      </head>
      <body className={`${playfair.variable} ${nunito.variable} min-h-dvh bg-white text-zinc-900 antialiased`}>
        {children}
      </body>
    </html>
  );
}
