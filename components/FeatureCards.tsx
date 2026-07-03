import Link from "next/link";
import { worlds } from "@/lib/content";

export function FeatureCards() {
  return (
    <section id="worlds" className="px-5 pb-0 pt-4">
      <div className="home-panel mx-auto grid max-w-7xl gap-0 p-5 md:grid-cols-4">
        {worlds.map((item) => {
          const Icon = item.icon;
          return (
            <Link href={item.href} key={item.title} className="quiet-card group flex gap-5 border-white/10 p-6 transition hover:bg-white/8 md:border-r md:last:border-r-0">
              <Icon className="mt-1 h-8 w-8 shrink-0 text-[#a996ff]" />
              <span>
                <h2 className="font-serif text-2xl">{item.title}</h2>
                <p className="mt-3 text-white/80">{item.intro}</p>
                <p className="mt-1 text-sm text-white/58">{item.body}</p>
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
