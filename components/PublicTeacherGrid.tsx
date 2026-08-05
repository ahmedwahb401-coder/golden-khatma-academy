import { Award, BookOpen } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export default async function PublicTeacherGrid({ gender }: { gender: "male" | "female" }) {
  const supabase = await createClient();
  const { data: teachers } = await supabase
    .from("teachers")
    .select("id, full_name, ijazah, specialty, years_experience, bio")
    .eq("gender", gender)
    .order("years_experience", { ascending: false });

  if (!teachers || teachers.length === 0) {
    return (
      <p className="text-center opacity-50 py-16">
        سيتم إضافة {gender === "male" ? "المحفّظين" : "المحفّظات"} قريباً.
      </p>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {teachers.map((t) => (
        <div
          key={t.id}
          className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 p-6 flex flex-col items-center text-center gap-2"
        >
          <div className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold mb-1 bg-primary">
            {t.full_name.split(" ")[1]?.[0] || t.full_name[0]}
          </div>
          <div className="font-bold">{t.full_name}</div>
          {t.specialty && (
            <div className="text-sm opacity-70 flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5" /> {t.specialty}
            </div>
          )}
          {t.ijazah && <div className="text-xs opacity-60">{t.ijazah}</div>}
          <div className="text-xs flex items-center gap-1 opacity-60">
            <Award className="w-3 h-3" /> {t.years_experience} سنوات خبرة
          </div>
          {t.bio && <p className="text-xs opacity-60 leading-relaxed mt-2">{t.bio}</p>}
        </div>
      ))}
    </div>
  );
}
