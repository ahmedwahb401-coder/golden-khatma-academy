"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Moon, Sun } from "lucide-react";
import RubElHizb from "./RubElHizb";

export default function Navbar() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <header className="sticky top-0 z-30 backdrop-blur-md border-b border-black/10 dark:border-white/10 bg-bg/80 dark:bg-bg-dark/80">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-5 py-3.5">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white bg-primary">
            <RubElHizb className="w-4 h-4" />
          </div>
          <span className="font-bold text-lg font-display">أكاديمية الختمة الذهبية</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link className="opacity-80 hover:opacity-100 transition" href="/men">
            قسم الرجال
          </Link>
          <Link className="opacity-80 hover:opacity-100 transition" href="/women">
            قسم النساء
          </Link>
          <Link className="opacity-80 hover:opacity-100 transition" href="/about">
            من نحن
          </Link>
          <Link className="opacity-80 hover:opacity-100 transition" href="/contact">
            تواصل معنا
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setDark((d) => !d)}
            aria-label="تبديل الوضع الليلي"
            className="w-9 h-9 rounded-full flex items-center justify-center border border-black/10 dark:border-white/20 transition hover:scale-105"
          >
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <Link
            href="/register"
            className="hidden sm:inline-block rounded-xl px-4 py-2 text-sm font-bold text-white transition hover:opacity-90 bg-primary"
          >
            سجّل الآن
          </Link>
        </div>
      </div>
    </header>
  );
}
