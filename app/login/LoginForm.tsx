"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, LogIn } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/week-plan";
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setMessage("");

    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") || "");
    const password = String(form.get("password") || "");
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    setPending(false);
    if (error) {
      setMessage(error.message);
      return;
    }

    router.replace(next);
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <label className="grid gap-2 text-sm font-semibold text-[#4d5547]">
        邮箱
        <input required type="email" name="email" autoComplete="email" className="h-12 rounded-xl border border-[#d8d2c4] bg-white px-4 outline-none focus:border-[#6f835e]" />
      </label>
      <label className="grid gap-2 text-sm font-semibold text-[#4d5547]">
        密码
        <input required type="password" name="password" autoComplete="current-password" className="h-12 rounded-xl border border-[#d8d2c4] bg-white px-4 outline-none focus:border-[#6f835e]" />
      </label>
      <button disabled={pending} className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#5f7a4f] px-5 font-bold text-white transition hover:bg-[#506a43] disabled:cursor-not-allowed disabled:opacity-60">
        {pending ? <Lock className="h-4 w-4" /> : <LogIn className="h-4 w-4" />}
        {pending ? "登录中" : "登录"}
      </button>
      {message ? <p className="text-sm font-semibold text-[#a5483d]">{message}</p> : null}
    </form>
  );
}
