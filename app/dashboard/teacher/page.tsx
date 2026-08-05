import { Users } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { programLabel } from "@/components/admin/types";
import StudentSessionRow, { type TeacherStudentRow } from "@/components/teacher/StudentSessionRow";

export default async function TeacherDashboardPage() {
  const user = await getCurrentUser();
  const supabase = await createClient();

  const { data: teacher } = await supabase
    .from("teachers")
    .select("id, full_name")
    .eq("user_id", user!.id)
    .maybeSingle();

  if (!teacher) {
    return (
      <div className="rounded-2xl border border-black/10 dark:border-white/10 p-8 text-center">
        <h2 className="font-bold text-lg mb-2">حسابك لسه مش مربوط ببروفايل محفّظ</h2>
        <p className="opacity-70 text-sm">تواصل مع الإدارة لربط حسابك ببروفايل المحفّظ الخاص بك.</p>
      </div>
    );
  }

  const { data: courses } = await supabase
    .from("courses")
    .select("id, program_id, students(full_name, program)")
    .eq("teacher_id", teacher.id)
    .eq("status", "active");

  const rows: TeacherStudentRow[] = (courses || []).map((c: any) => ({
    courseId: c.id,
    studentName: c.students?.full_name || "—",
    program: programLabel[c.students?.program as keyof typeof programLabel] || "",
  }));

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <Users className="w-5 h-5 text-primary" />
        <h1 className="text-2xl font-bold font-display">طلابي ({rows.length})</h1>
      </div>

      {rows.length === 0 ? (
        <p className="opacity-60 text-sm">لسه معندكش طلاب مُعيّنين. تواصل مع الإدارة لتعيين طلاب لك.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {rows.map((row) => (
            <StudentSessionRow key={row.courseId} row={row} />
          ))}
        </div>
      )}
    </div>
  );
}
