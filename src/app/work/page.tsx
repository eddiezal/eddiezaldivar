export const metadata = {
  title: "Recent Work — Eddie Zaldivar",
  description: "Funnels, automations, analytics shipped fast.",
};
export const dynamic = "force-static";

const items = [
  { tag: "funnel • automation", title: "Booking flow + reminders", metric: "No-shows −42%, bookings +19%" },
  { tag: "AI bot • ops",        title: "FAQ bot + triage",        metric: "Support emails −35%, site→booking +12%" },
];

export default function Work(){
  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="font-playfair text-3xl mb-6">Recent Work</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {items.map((c,i)=>(
          <div key={i} className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5">
            <div className="text-[10px] uppercase tracking-[0.18em] text-zinc-500 mb-2">{c.tag}</div>
            <div className="font-semibold mb-1">{c.title}</div>
            <div className="text-emerald-700 dark:text-emerald-400 text-sm">{c.metric}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
