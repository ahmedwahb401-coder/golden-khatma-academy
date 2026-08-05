"use client";

import { useState } from "react";
import { FileDown } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { logReport } from "@/app/admin/reports/actions";

const inputClass =
  "w-full rounded-xl border border-black/10 dark:border-white/15 bg-white/70 dark:bg-white/5 px-4 py-2.5 text-sm focus:border-primary outline-none transition";

export default function ReportGenerator({ students }: { students: { id: string; full_name: string }[] }) {
  const [studentId, setStudentId] = useState(students[0]?.id || "");
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    if (!studentId) return;
    setLoading(true);

    const supabase = createClient();
    const student = students.find((s) => s.id === studentId);

    const { data: courses } = await supabase.from("courses").select("id").eq("student_id", studentId);
    const courseIds = (courses || []).map((c) => c.id);

    const [{ data: attendance }, { data: memorization }, { data: payments }] = await Promise.all([
      supabase.from("attendance").select("status").in("course_id", courseIds.length ? courseIds : ["-"]),
      supabase
        .from("memorization")
        .select("session_date, surah, grade")
        .in("course_id", courseIds.length ? courseIds : ["-"])
        .order("session_date", { ascending: false })
        .limit(10),
      supabase.from("payments").select("month, status, amount").eq("student_id", studentId),
    ]);

    const presentCount = (attendance || []).filter((a) => a.status === "present").length;
    const totalCount = (attendance || []).length;
    const attendanceRate = totalCount ? Math.round((presentCount / totalCount) * 100) : 0;

    // توليد PDF بسيط باستخدام jsPDF مباشرة في المتصفح
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Khatma Academy - Student Progress Report", 14, 20);
    doc.setFontSize(11);
    doc.text(`Student: ${student?.full_name || ""}`, 14, 32);
    doc.text(`Date: ${new Date().toLocaleDateString("en-GB")}`, 14, 39);

    doc.text(`Attendance rate: ${attendanceRate}% (${presentCount}/${totalCount} sessions)`, 14, 50);

    doc.text("Recent memorization sessions:", 14, 62);
    let y = 70;
    (memorization || []).forEach((m) => {
      doc.text(`- ${m.session_date}  ${m.surah || ""}  grade: ${m.grade ?? "-"}`, 16, y);
      y += 7;
    });

    y += 6;
    doc.text("Payments:", 14, y);
    y += 8;
    (payments || []).forEach((p) => {
      doc.text(`- ${p.month}  ${p.amount} EGP  (${p.status})`, 16, y);
      y += 7;
    });

    doc.save(`${student?.full_name || "report"}-report.pdf`);

    await logReport(studentId, new Date().toLocaleDateString("ar-EG", { year: "numeric", month: "long" }));
    setLoading(false);
  }

  return (
    <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 p-6 flex flex-col gap-4 max-w-md">
      <h3 className="font-bold">توليد تقرير طالب (PDF)</h3>
      <select className={inputClass} value={studentId} onChange={(e) => setStudentId(e.target.value)}>
        {students.map((s) => (
          <option key={s.id} value={s.id}>
            {s.full_name}
          </option>
        ))}
      </select>
      <button
        onClick={handleGenerate}
        disabled={loading || !studentId}
        className="flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-sm font-bold text-white transition hover:opacity-90 disabled:opacity-60 bg-primary"
      >
        <FileDown className="w-4 h-4" /> {loading ? "جاري التوليد..." : "توليد وتنزيل PDF"}
      </button>
      <p className="text-xs opacity-50 leading-relaxed">
        يتم توليد التقرير في المتصفح مباشرة (بدون سيرفر إضافي)، ويُسجَّل في جدول reports.
      </p>
    </div>
  );
}
