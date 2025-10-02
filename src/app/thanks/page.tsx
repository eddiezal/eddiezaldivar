"use client";
import { useEffect } from "react";

export default function Thanks() {
  useEffect(() => {
    // 1) Start the download
    const a = document.createElement("a");
    a.href = "/api/leadmagnet";
    a.download = "Funnel-Health-Check.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();

    // 2) Fire Plausible event
    // @ts-ignore
    window.plausible?.("leadmagnet_download", { props: { asset: "Funnel Health Check v1" } });
  }, []);

  return (
    <main className="min-h-dvh grid place-items-center p-8">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-semibold">Check your downloads</h1>
        <p className="text-zinc-600 mt-2">
          Your <em>5-Minute Funnel Health Check</em> should start downloading. If it didn’t,{" "}
          <a className="underline" href="/api/leadmagnet">click here</a>.
        </p>
      </div>
    </main>
  );
}
