import SiteMockup from "@/components/SiteMockup";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fractional Growth & AI — Eddie Zaldivar",
  description: "72-Hour Demo. Funnels, automations, analytics shipped in days—not quarters.",
  openGraph: { title: "Fractional Growth & AI — Eddie Zaldivar", description: "See a working demo before you buy it." }
};

export const dynamic = "force-static";

export default function Home(){ return <SiteMockup />; }
