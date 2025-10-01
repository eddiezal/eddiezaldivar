import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "eddiezaldivar.com",
  description: "Fractional growth & AI",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-dvh bg-white text-zinc-900 antialiased">
        {children}
      </body>
    </html>
  );
}
