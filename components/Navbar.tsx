"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, BookOpen, ChevronDown, ClipboardList, Home, Search, ShoppingBasket, Sprout, User, Warehouse } from "lucide-react";
import { BrandMark } from "@/components/BrandMark";
import { navLinks } from "@/lib/content";

export function Navbar() {
  const pathname = usePathname();
  const bottomLinks = [
    { href: "/", label: "首页", icon: Home, active: pathname === "/" },
    { href: "/week-plan", label: "一周菜单", icon: BookOpen, active: pathname === "/week-plan" },
    { href: "/ingredients", label: "食材库", icon: Warehouse, active: pathname === "/ingredients" },
    { href: "/shopping", label: "购物清单", icon: ShoppingBasket, active: pathname === "/shopping" },
    { href: "/history", label: "我的记录", icon: ClipboardList, active: pathname === "/history" }
  ];

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-[#ece6dc] bg-white/90 pt-[env(safe-area-inset-top)] backdrop-blur-xl">
      <nav className="mx-auto grid max-w-[88rem] grid-cols-[1fr_auto] items-center gap-4 px-5 py-3 md:grid-cols-[1fr_auto_1fr] md:py-5">
        <Link href="/" aria-label="轻食日历首页" className="hidden md:block">
          <BrandMark />
        </Link>
        <Link href="/" aria-label="轻食日历首页" className="inline-flex items-center gap-2 md:hidden">
          <Sprout className="h-7 w-7 text-[#6f835e]" />
          <span>
            <span className="block font-serif text-xl leading-none text-[#2f4328]">轻食日记</span>
            <span className="mt-1 block text-[9px] font-semibold tracking-[.12em] text-[#8c947f]">LIGHT FOOD DIARY</span>
          </span>
        </Link>
        <div className="hidden items-center gap-10 text-[15px] font-semibold text-[#2f332c] md:flex">
          {navLinks.map((link) => (
            <Link className="border-b-2 border-transparent py-2 transition hover:border-[#6f835e] hover:text-[#566c45]" href={link.href} key={link.href}>
              {link.label}
            </Link>
          ))}
        </div>
        <div className="ml-auto hidden items-center gap-5 md:flex">
          <Bell className="h-5 w-5 text-[#555a50]" />
          <span className="grid h-11 w-11 place-items-center rounded-full bg-[#e7e5d6] text-[#6f835e]">枝</span>
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#2f332c]">Selene <ChevronDown className="h-4 w-4" /></span>
        </div>
        <div className="ml-auto flex items-center gap-2 md:hidden">
          <button className="grid h-11 w-11 place-items-center rounded-full text-[#2f332c]" aria-label="搜索">
            <Search className="h-5 w-5" />
          </button>
          <button className="grid h-11 w-11 place-items-center rounded-full text-[#2f332c]" aria-label="通知">
            <Bell className="h-5 w-5" />
          </button>
          <Link href="/history" className="grid h-11 w-11 place-items-center rounded-full bg-[#e7e5d6] text-[#6f835e]" aria-label="我的">
            <User className="h-5 w-5" />
          </Link>
        </div>
      </nav>
    </header>
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-[#e6dece] bg-[#fffdf8]/95 px-3 pb-[calc(env(safe-area-inset-bottom)+8px)] pt-2 shadow-[0_-12px_28px_rgba(70,63,48,.08)] backdrop-blur-xl md:hidden">
        <div className="mx-auto grid max-w-md grid-cols-5">
          {bottomLinks.map(({ href, label, icon: Icon, active }) => (
            <Link key={label} href={href} className={`grid min-h-12 place-items-center gap-1 rounded-2xl text-[11px] ${active ? "text-[#5f7a4f]" : "text-[#9aa18f]"}`}>
              <Icon className={`h-5 w-5 ${active ? "fill-[#dfe9dc]" : ""}`} />
              <span>{label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
