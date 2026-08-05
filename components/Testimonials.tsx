"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { testimonials } from "@/lib/data";

export default function Testimonials() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % testimonials.length), 5000);
    return () => clearInterval(id);
  }, []);

  const t = testimonials[idx];

  return (
    <section id="testimonials" className="max-w-3xl mx-auto px-5 py-24 text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-14 font-display">آراء طلابنا</h2>
      <div className="relative rounded-3xl p-8 md:p-10 border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5">
        <div className="flex justify-center gap-1 mb-4">
          {Array.from({ length: t.rating }).map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-current text-secondary" />
          ))}
        </div>
        <p className="text-lg leading-relaxed mb-6">"{t.text}"</p>
        <div className="font-bold">{t.name}</div>
        <div className="text-sm opacity-60">{t.role}</div>

        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              aria-label={`رأي رقم ${i + 1}`}
              className="h-2 rounded-full transition-all"
              style={{
                width: i === idx ? 20 : 8,
                background: i === idx ? "#0F6B4B" : "rgba(120,120,120,0.3)",
              }}
            />
          ))}
        </div>

        <button
          onClick={() => setIdx((i) => (i - 1 + testimonials.length) % testimonials.length)}
          aria-label="السابق"
          className="absolute top-1/2 -translate-y-1/2 -right-3 md:right-0 w-9 h-9 rounded-full border border-black/10 dark:border-white/20 flex items-center justify-center bg-white/80 dark:bg-black/30"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
        <button
          onClick={() => setIdx((i) => (i + 1) % testimonials.length)}
          aria-label="التالي"
          className="absolute top-1/2 -translate-y-1/2 -left-3 md:left-0 w-9 h-9 rounded-full border border-black/10 dark:border-white/20 flex items-center justify-center bg-white/80 dark:bg-black/30"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
