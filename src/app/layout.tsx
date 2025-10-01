import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Eddie Zaldivar — One-Week Demo",
  description: "Funnels, automations, analytics in a week — with a Proof Dashboard."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
