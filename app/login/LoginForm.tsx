"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { signIn, type LoginState } from "./actions";

const inputClass =
  "w-full rounded-xl border border-black/10 dark:border-white/15 bg-white/70 dark:bg-white/5 px-4 py-2.5 text-sm focus:border-primary outline-none transition";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-xl py-3.5 font-bold text-white transition hover:opacity-90 disabled:opacity-60 bg-primary"
    >
      {pending ? "جاري الدخول..." : "تسجيل الدخول"}
    </button>
  );
}

export default function LoginForm({ redirectTo }: { redirectTo: string }) {
  const [state, formAction] = useActionState<LoginState, FormData>(signIn, null);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <input type="hidden" name="redirectTo" value={redirectTo} />
      <div>
        <label className="text-sm font-bold mb-1.5 block">البريد الإلكتروني</label>
        <input type="email" name="email" required className={inputClass} />
      </div>
      <div>
        <label className="text-sm font-bold mb-1.5 block">كلمة المرور</label>
        <input type="password" name="password" required className={inputClass} />
      </div>
      {state?.error && <p className="text-sm text-red-600">{state.error}</p>}
      <SubmitButton />
    </form>
  );
}
