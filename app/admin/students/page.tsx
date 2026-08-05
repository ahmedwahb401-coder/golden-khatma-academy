import { createClient } from "@/lib/supabase/server";
import StudentsTable from "@/components/admin/StudentsTable";
import type { StudentRow } from "@/components/admin/types";

export default async function AdminStudentsPage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("students")
    .select(
      "id, full_name, age, country, city, phone, whatsapp, email, gender, program, level, memorized_parts, preferred_time, status, created_at, user_id"
    )
    .order("created_at", { ascending: false });

  const students = (data as StudentRow[]) || [];

  // حسابات المستخدمين اللي دورها "student" ولسه مش مربوطة بأي طالب
  const { data: studentUsers } = await supabase
    .from("users")
    .select("id, full_name")
    .eq("role", "student");

  const linkedIds = new Set(students.map((s) => s.user_id).filter(Boolean));
  const availableUsers = (studentUsers || []).filter((u) => !linkedIds.has(u.id));

  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold font-display">الطلاب</h1>
          <p className="text-sm opacity-60 mt-1">{students.length} طلب تسجيل إجمالاً</p>
        </div>
      </div>

      {error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-600 mb-5">
          تعذّر تحميل بيانات الطلاب. تأكد من ضبط متغيرات Supabase في .env.local.
        </div>
      )}

      <StudentsTable students={students} availableUsers={availableUsers} />
    </div>
  );
}
