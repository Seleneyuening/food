import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { posts } from "@/lib/content";

export function JournalPreview({ all = false }: { all?: boolean }) {
  const visible = all ? posts : posts.slice(0, 3);
  return (
    <section className="px-5 pb-20 pt-0">
      <div className={all ? "mx-auto max-w-7xl" : "home-panel mx-auto max-w-7xl border-t-0 p-8"}>
        <div className="mb-7 flex items-end justify-between gap-6">
          <h2 className="font-serif text-2xl md:text-3xl">From the Journal</h2>
          <Link className="group inline-flex items-center gap-2 text-sm text-shore-mist" href="/journal">View all <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1.5" /></Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {visible.map((post) => (
            <Link href="/journal" className="quiet-card group overflow-hidden border border-white/12 bg-[#0b1736]/72 shadow-[0_20px_80px_rgba(0,0,0,.24)] backdrop-blur-xl transition hover:-translate-y-1" key={post.title}>
              <div className={`${post.visual} h-44 transition duration-500 group-hover:scale-105`} />
              <div className="p-6">
                <p className="inline-block bg-[#9382f5]/75 px-3 py-1 text-xs text-white">{post.category}</p>
                <h3 className="mt-5 font-serif text-2xl">{post.title}</h3>
                <p className="mt-3 text-white/68">{post.excerpt}</p>
                <p className="mt-6 text-sm text-white/48">{post.date}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
