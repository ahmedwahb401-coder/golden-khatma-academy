import { CalendarCheck, BookOpen, Bell, GraduationCap } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import HomeworkUpload from "@/components/HomeworkUpload";
import { programLabel } from "@/components/admin/types";

export default async function StudentDashboardPage() {
  const user = await getCurrentUser();
  const supabase = await createClient();

  // يبحث عن سجل الطالب المرتبط بحساب الدخول الحالي
  const { data: student } = await supabase
    .from("students")
    .select("id, program, level, memorized_parts, status")
    .eq("user_id", user!.id)
    .maybeSingle();

  if (!student) {
    return (
      <div className="rounded-2xl border border-black/10 dark:border-white/10 p-8 text-center">
        <h2 className="font-bold text-lg mb-2">لسه معملتش طلب تسجيل مرتبط بحسابك</h2>
        <p className="opacity-70 text-sm">
          تواصل مع الإدارة لربط حسابك بطلب التسجيل الخاص بك، أو سجّل بيانات جديدة من صفحة التسجيل.
        </p>
      </div>
    );
  }

  const { data: course } = await supabase
    .from("courses")
    .select("id, start_date, teachers(full_name, specialty)")
    .eq("student_id", student.id)
    .eq("status", "active")
    .maybeSingle();

  const { data: attendance } = await supabase
    .from("attendance")
    .select("session_date, status")
    .eq("course_id", course?.id || "")
    .order("session_date", { ascending: false })
    .limit(6);

  const { data: memorization } = await supabase
    .from("memorization")
    .select("session_date, surah, grade, notes")
    .eq("course_id", course?.id || "")
    .order("session_date", { ascending: false })
    .limit(6);

  const { data: notifications } = await supabase
    .from("notifications")
    .select("message, sent_at")
    .eq("student_id", student.id)
    .order("sent_at", { ascending: false })
    .limit(5);

  const teacher = (course as any)?.teachers as { full_name: string; specialty: string } | null;

  return (
    <div className="flex flex-col gap-8">
      {/* الخطة والمحفّظ */}
      <div className="grid sm:grid-cols-2 gap-5">
        <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 p-6">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="w-5 h-5 text-primary" />
            <h3 className="font-bold">خطتك</h3>
          </div>
          <p className="text-sm opacity-70">
            برنامج {programLabel[student.program as keyof typeof programLabel]} — مستوى{" "}
            {student.level === "beginner" ? "مبتدئ" : student.level === "intermediate" ? "متوسط" : "متقدم"}
          </p>
          <p className="text-sm opacity-70 mt-1">عدد الأجزاء المحفوظة: {student.memorized_parts}</p>
        </div>

        <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 p-6">
          <div className="flex items-center gap-2 mb-3">
            <GraduationCap className="w-5 h-5 text-primary" />
            <h3 className="font-bold">المحفّظ / المحفّظة</h3>
          </div>
          {teacher ? (
            <>
              <p className="text-sm font-bold">{teacher.full_name}</p>
              <p className="text-sm opacity-70">{teacher.specialty}</p>
            </>
          ) : (
            <p className="text-sm opacity-60">لسه معندكش محفّظ مُعيّن — هيتم التعيين قريباً.</p>
          )}
        </div>
      </div>

      {/* الحضور */}
      <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 p-6">
        <div className="flex items-center gap-2 mb-4">
          <CalendarCheck className="w-5 h-5 text-primary" />
          <h3 className="font-bold">آخر الحضور</h3>
        </div>
        {attendance && attendance.length > 0 ? (
          <ul className="flex flex-col gap-2">
            {attendance.map((a, i) => (
              <li key={i} className="flex items-center justify-between text-sm border-t border-black/5 dark:border-white/5 pt-2 first:border-0 first:pt-0">
                <span className="opacity-70">{new Date(a.session_date).toLocaleDateString("ar-EG")}</span>
                <span className={a.status === "present" ? "text-emerald-600 font-bold" : "text-amber-600 font-bold"}>
                  {a.status === "present" ? "حاضر" : a.status === "absent" ? "غائب" : "بعذر"}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm opacity-50">لا يوجد سجل حضور بعد.</p>
        )}
      </div>

      {/* التسميع والدرجات */}
      <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 p-6">
        <h3 className="font-bold mb-4">التسميع والدرجات</h3>
        {memorization && memorization.length > 0 ? (
          <ul className="flex flex-col gap-3">
            {memorization.map((m, i) => (
              <li key={i} className="border-t border-black/5 dark:border-white/5 pt-3 first:border-0 first:pt-0">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-bold">{m.surah}</span>
                  <span className="text-primary font-bold">{m.grade ?? "—"}</span>
                </div>
                <p className="text-xs opacity-60 mt-1">{m.notes}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm opacity-50">لا يوجد سجل تسميع بعد.</p>
        )}
      </div>

      {/* الإشعارات */}
      <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Bell className="w-5 h-5 text-primary" />
          <h3 className="font-bold">الإشعارات</h3>
        </div>
        {notifications && notifications.length > 0 ? (
          <ul className="flex flex-col gap-2">
            {notifications.map((n, i) => (
              <li key={i} className="text-sm border-t border-black/5 dark:border-white/5 pt-2 first:border-0 first:pt-0">
                {n.message}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm opacity-50">لا يوجد إشعارات جديدة.</p>
        )}
      </div>

      {/* رفع الواجب الصوتي */}
      <HomeworkUpload studentId={student.id} courseId={course?.id || null} />
    </div>
  );
}
