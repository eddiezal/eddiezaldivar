"use client";
import { useState } from "react";

export default function CalendlyModal(){
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <button onClick={()=>setOpen(true)} className="rounded-xl px-5 py-3 font-semibold text-white bg-gradient-to-r from-emerald-600 to-teal-500">
        Book a 15-min fit check
      </button>

      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4">
          <div className="bg-white dark:bg-zinc-950 rounded-2xl p-6 w-full max-w-2xl relative">
            <button onClick={()=>setOpen(false)} className="absolute top-3 right-3 border px-2 py-1 rounded">Close</button>

            {!loaded ? (
              <div className="text-center space-y-3">
                <p className="text-sm text-zinc-600">Calendly loads after you click. Keeps the site fast.</p>
                <button onClick={()=>setLoaded(true)} className="rounded-xl px-5 py-3 font-semibold text-white bg-gradient-to-r from-emerald-600 to-teal-500">
                  Load Calendly
                </button>
              </div>
            ) : (
              <iframe
                title="Calendly"
                className="w-full h-[640px] rounded-xl border mt-2"
                src="https://calendly.com/YOUR_HANDLE/15min?hide_landing_page_details=1&hide_gdpr_banner=1"
                loading="lazy"
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
