"use client";

import { LogOut } from "lucide-react";
import { signOut } from "@/app/login/actions";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut()}
      className="flex items-center gap-1.5 text-sm font-bold text-red-600 hover:opacity-80 transition"
    >
      <LogOut className="w-4 h-4" /> تسجيل الخروج
    </button>
  );
}
