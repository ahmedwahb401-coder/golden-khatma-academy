import { createClient } from "@/lib/supabase/server";
import TeachersTable, { type TeacherRow } from "@/components/admin/TeachersTable";

export default async function AdminTeachersPage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("teachers")
    .select("id, full_name, gender, ijazah, specialty, years_experience, bio, user_id")
    .order("created_at", { ascending: false });

  const teachers = (data as TeacherRow[]) || [];

  const { data: teacherUsers } = await supabase
    .from("users")
    .select("id, full_name")
    .eq("role", "teacher");

  const linkedIds = new Set(teachers.map((t) => t.user_id).filter(Boolean));
  const availableUsers = (teacherUsers || []).filter((u) => !linkedIds.has(u.id));

  return (
    <div className="p-6 md:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold font-display">المحفّظون والمحفّظات</h1>
        <p className="text-sm opacity-60 mt-1">{teachers.length} محفّظ ومحفّظة مسجّلين</p>
      </div>

      {error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-600 mb-5">
          تعذّر تحميل بيانات المحفّظين. تأكد من ضبط متغيرات Supabase في .env.local.
        </div>
      )}

      <TeachersTable teachers={teachers} availableUsers={availableUsers} />
    </div>
  );
}
