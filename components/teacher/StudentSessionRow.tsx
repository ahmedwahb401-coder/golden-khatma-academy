"use client";

import { useState } from "react";
import { ChevronDown, CheckCircle2 } from "lucide-react";
import { logSession } from "@/app/dashboard/teacher/actions";

const inputClass =
  "w-full rounded-lg border border-black/10 dark:border-white/15 bg-white/70 dark:bg-white/5 px-3 py-2 text-sm outline-none focus:border-primary transition";

export type TeacherStudentRow = {
  courseId: string;
  studentName: string;
  program: string;
};

export default function StudentSessionRow({ row }: { row: TeacherStudentRow }) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"present" | "absent" | "excused">("present");
  const [surah, setSurah] = useState("");
  const [fromAyah, setFromAyah] = useState("");
  const [toAyah, setToAyah] = useState("");
  const [grade, setGrade] = useState("");
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleSave() {
    setSaving(true);
    const res = await logSession({
      course_id: row.courseId,
      attendance_status: status,
      surah,
      from_ayah: fromAyah ? Number(fromAyah) : null,
      to_ayah: toAyah ? Number(toAyah) : null,
      grade: grade ? Number(grade) : null,
      notes,
    });
    setSaving(false);
    if (!res?.error) {
      setSaved(true);
      setOpen(false);
    }
  }

  return (
    <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-4 text-right"
      >
        <div>
          <div className="font-bold">{row.studentName}</div>
          <div className="text-xs opacity-60">{row.program}</div>
        </div>
        <div className="flex items-center gap-2">
          {saved && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
          <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />
        </div>
      </button>

      {open && (
        <div className="px-5 pb-5 grid sm:grid-cols-2 gap-3 border-t border-black/5 dark:border-white/5 pt-4">
          <div>
            <label className="text-xs font-bold opacity-70 mb-1 block">الحضور</label>
            <select className={inputClass} value={status} onChange={(e) => setStatus(e.target.value as any)}>
              <option value="present">حاضر</option>
              <option value="absent">غائب</option>
              <option value="excused">بعذر</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-bold opacity-70 mb-1 block">السورة (للتسميع)</label>
            <input className={inputClass} value={surah} onChange={(e) => setSurah(e.target.value)} />
          </div>
          <div>
            <label className="text-xs font-bold opacity-70 mb-1 block">من آية</label>
            <input type="number" className={inputClass} value={fromAyah} onChange={(e) => setFromAyah(e.target.value)} />
          </div>
          <div>
            <label className="text-xs font-bold opacity-70 mb-1 block">إلى آية</label>
            <input type="number" className={inputClass} value={toAyah} onChange={(e) => setToAyah(e.target.value)} />
          </div>
          <div>
            <label className="text-xs font-bold opacity-70 mb-1 block">الدرجة</label>
            <input type="number" className={inputClass} value={grade} onChange={(e) => setGrade(e.target.value)} />
          </div>
          <div className="sm:col-span-2">
            <label className="text-xs font-bold opacity-70 mb-1 block">ملاحظات</label>
            <textarea rows={2} className={inputClass} value={notes} onChange={(e) => setNotes(e.target.value)} />
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="sm:col-span-2 rounded-xl py-2.5 text-sm font-bold text-white transition hover:opacity-90 disabled:opacity-60 bg-primary"
          >
            {saving ? "جاري الحفظ..." : "حفظ جلسة اليوم"}
          </button>
        </div>
      )}
    </div>
  );
}
