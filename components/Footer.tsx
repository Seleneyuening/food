"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandMark } from "@/components/BrandMark";
import { navLinks } from "@/lib/content";

export function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/recipes/")) return null;

  return (
    <footer className="border-t border-[#e9dfcf] bg-[#fbf8ef] px-5 py-10 text-[#6f7668]">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1fr_auto]">
        <div>
          <BrandMark />
          <p className="mt-4">TODAY&apos;S TABLE · WEEK PLAN · PANTRY</p>
        </div>
        <div className="grid gap-3 text-sm md:grid-cols-2">
          {navLinks.map((link) => (
            <Link className="hover:text-[#45513e]" href={link.href} key={link.href}>{link.label}</Link>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-10 flex max-w-7xl flex-wrap justify-between gap-4 text-sm text-[#9b9483]">
        <p>© 2026 轻食日历</p>
        <p>Local-first V1</p>
      </div>
    </footer>
  );
}
