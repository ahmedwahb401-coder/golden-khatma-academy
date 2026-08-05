"use client";

import { useEffect, useRef, useState } from "react";
import { stats } from "@/lib/data";

function useCountUp(target: number, active: boolean) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let frame: number;
    const duration = 1400;
    const start = performance.now();
    const step = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setValue(Math.floor(p * target));
      if (p < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [active, target]);
  return value;
}

function StatCard({ label, value, active }: { label: string; value: number; active: boolean }) {
  const val = useCountUp(value, active);
  return (
    <div className="flex flex-col items-center gap-2 px-4">
      <div className="text-3xl md:text-4xl font-bold font-display text-primary">
        {val.toLocaleString("ar-EG")}+
      </div>
      <div className="text-sm opacity-70">{label}</div>
    </div>
  );
}

export default function StatsSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => entry.isIntersecting && setVisible(true), {
      threshold: 0.4,
    });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="border-y border-black/10 dark:border-white/10">
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-6 px-5 py-10">
        {stats.map((s) => (
          <StatCard key={s.label} label={s.label} value={s.value} active={visible} />
        ))}
      </div>
    </section>
  );
}
