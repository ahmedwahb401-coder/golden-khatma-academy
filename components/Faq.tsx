"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqs } from "@/lib/data";

export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="max-w-3xl mx-auto px-5 py-24">
      <h2 className="text-3xl md:text-4xl font-bold mb-14 text-center font-display">
        الأسئلة الشائعة
      </h2>
      <div className="flex flex-col gap-3">
        {faqs.map((f, i) => (
          <div
            key={f.q}
            className="rounded-2xl border border-black/10 dark:border-white/10 overflow-hidden"
          >
            <button
              onClick={() => setOpen(open === i ? -1 : i)}
              className="w-full flex items-center justify-between px-5 py-4 text-right font-bold"
              aria-expanded={open === i}
            >
              {f.q}
              <ChevronDown
                className={`w-4 h-4 shrink-0 transition-transform text-primary ${
                  open === i ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className="grid transition-all duration-300"
              style={{ gridTemplateRows: open === i ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-4 text-sm opacity-70 leading-relaxed">{f.a}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
