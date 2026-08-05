"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

const inputClass =
  "w-full rounded-xl border border-black/10 dark:border-white/15 bg-white/70 dark:bg-white/5 px-4 py-2.5 text-sm focus:border-primary outline-none transition";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    const supabase = createClient();
    const { error } = await supabase.from("contact_messages").insert([{ name, email, phone, message }]);

    if (error) {
      setStatus("error");
      return;
    }
    setStatus("success");
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-primary/30 bg-primary/5 p-6 text-center">
        <p className="font-bold">تم إرسال رسالتك بنجاح 🎉</p>
        <p className="text-sm opacity-70 mt-1">هنرد عليك في أقرب وقت.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input required placeholder="الاسم" className={inputClass} value={name} onChange={(e) => setName(e.target.value)} />
      <input
        required
        type="email"
        placeholder="البريد الإلكتروني"
        className={inputClass}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input placeholder="رقم الهاتف (اختياري)" className={inputClass} value={phone} onChange={(e) => setPhone(e.target.value)} />
      <textarea
        required
        rows={4}
        placeholder="رسالتك"
        className={inputClass}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      {status === "error" && <p className="text-sm text-red-600">حدث خطأ، حاول مرة أخرى.</p>}
      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-xl py-3 font-bold text-white transition hover:opacity-90 disabled:opacity-60 bg-primary"
      >
        {status === "loading" ? "جاري الإرسال..." : "إرسال الرسالة"}
      </button>
    </form>
  );
}
