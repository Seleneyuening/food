import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { heroCards } from "@/lib/content";

export function Hero() {
  return (
    <section className="relative isolate min-h-[76vh] overflow-hidden px-5 pt-28">
      <div className="stars absolute inset-0 -z-10 opacity-25" />
      <div className="mx-auto grid min-h-[calc(76vh-7rem)] max-w-7xl items-center gap-12 pb-12 md:grid-cols-[1.05fr_.95fr]">
        <div className="max-w-3xl">
          <p className="fade-up mb-5 text-lg text-[#cbb8ff]">A quiet future for beautiful living.</p>
          <h1 className="fade-up font-serif text-6xl leading-[.96] text-white drop-shadow-[0_12px_50px_rgba(0,0,0,.42)] [animation-delay:90ms] md:text-7xl lg:text-8xl">
            A quiet future
            <br />
            for beautiful living.
          </h1>
          <p className="fade-up mt-7 max-w-xl text-lg leading-8 text-white/76 [animation-delay:180ms]">在星光与海岸之间，创造属于你的美好生活。</p>
          <a href="#worlds" className="fade-up group mt-8 inline-flex items-center gap-8 rounded-full border border-white/20 bg-gradient-to-r from-[#8d7bf6]/90 to-[#e78ac8]/90 px-7 py-4 font-serif text-lg text-white shadow-glow transition hover:-translate-y-1 [animation-delay:270ms]">
            Explore More <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1.5" />
          </a>
        </div>
        <div className="grid gap-5">
          {heroCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <Link className="hero-glass fade-up group flex min-h-28 items-center justify-between gap-6 px-7 py-6 transition duration-300 hover:-translate-y-1 hover:bg-white/18" href={card.href} key={card.title} style={{ animationDelay: `${360 + index * 110}ms` }}>
                <Icon className="h-8 w-8 shrink-0 text-[#c8b4ff]" />
                <span className="min-w-0 flex-1">
                  <strong className="font-serif text-3xl font-normal">{card.title}</strong>
                  <span className="mt-2 block text-white/72">{card.body}</span>
                </span>
                <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
