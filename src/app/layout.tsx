import "./globals.css";
import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { playfair, nunito } from "./fonts";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.eddiezaldivar.com"),
  title: "eddiezaldivar.com",
  description: "Fractional growth & AI",
  openGraph: {
    title: "eddiezaldivar.com",
    description: "Fractional growth & AI",
    url: "https://www.eddiezaldivar.com",
    siteName: "eddiezaldivar.com",
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0F172A",
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
