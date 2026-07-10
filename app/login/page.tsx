import { Suspense } from "react";
import { redirect } from "next/navigation";
import { BrandMark } from "@/components/BrandMark";
import { LoginForm } from "@/app/login/LoginForm";
import { createClient } from "@/lib/supabase/server";

export default async function LoginPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();

  if (data?.claims) redirect("/week-plan");

  return (
    <main className="mx-auto grid min-h-[calc(100vh-10rem)] max-w-md content-center px-5 py-12">
      <div className="grid gap-8 rounded-2xl border border-[#e4dccd] bg-[#fffdf8] p-7 shadow-[0_18px_50px_rgba(68,55,34,.08)]">
        <BrandMark />
        <div>
          <h1 className="font-serif text-4xl text-[#2f4328]">登录轻食日历</h1>
          <p className="mt-3 text-sm leading-6 text-[#69705f]">登录后查看你的菜单、食材库、购物清单和记录。</p>
        </div>
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}
