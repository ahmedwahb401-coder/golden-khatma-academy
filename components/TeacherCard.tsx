import { Award, ChevronLeft } from "lucide-react";

export default function TeacherCard({
  name,
  spec,
  years,
}: {
  name: string;
  spec: string;
  years: string;
}) {
  const initial = name.split(" ")[1]?.[0] || name[0];
  return (
    <div className="rounded-2xl p-6 border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 text-center flex flex-col items-center gap-2">
      <div className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold mb-2 bg-primary">
        {initial}
      </div>
      <div className="font-bold">{name}</div>
      <div className="text-sm opacity-70">{spec}</div>
      <div className="text-xs flex items-center gap-1 opacity-60">
        <Award className="w-3 h-3" /> {years}
      </div>
      <button className="mt-2 text-xs font-bold flex items-center gap-1 text-primary">
        اقرأ المزيد <ChevronLeft className="w-3 h-3" />
      </button>
    </div>
  );
}
