"use client";

import { useMemo, useState, useTransition } from "react";
import { Search, Link2 } from "lucide-react";
import { updateStudentStatus, linkStudentUser } from "@/app/admin/students/actions";
import {
  type StudentRow,
  programLabel,
  statusLabel,
  statusColor,
} from "./types";

const selectClass =
  "rounded-lg border border-black/10 dark:border-white/15 bg-white/70 dark:bg-white/5 px-3 py-1.5 text-xs outline-none focus:border-primary transition";

export default function StudentsTable({
  students,
  availableUsers,
}: {
  students: StudentRow[];
  availableUsers: { id: string; full_name: string }[];
}) {
  const [query, setQuery] = useState("");
  const [programFilter, setProgramFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isPending, startTransition] = useTransition();
  const [rows, setRows] = useState(students);

  const filtered = useMemo(() => {
    return rows.filter((s) => {
      const matchesQuery =
        query.trim() === "" ||
        s.full_name.includes(query) ||
        s.email.toLowerCase().includes(query.toLowerCase()) ||
        s.phone.includes(query);
      const matchesProgram = programFilter === "all" || s.program === programFilter;
      const matchesStatus = statusFilter === "all" || s.status === statusFilter;
      return matchesQuery && matchesProgram && matchesStatus;
    });
  }, [rows, query, programFilter, statusFilter]);

  function handleStatusChange(id: string, status: StudentRow["status"]) {
    // تحديث فوري في الواجهة، مع تنفيذ الحفظ الفعلي في الخلفية
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    startTransition(async () => {
      const res = await updateStudentStatus(id, status);
      if (res?.error) {
        // في حالة الفشل، رجّع القيمة القديمة
        setRows(students);
      }
    });
  }

  function handleLinkUser(id: string, userId: string) {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, user_id: userId || null } : r)));
    startTransition(async () => {
      const res = await linkStudentUser(id, userId || null);
      if (res?.error) setRows(students);
    });
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 opacity-40" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ابحث بالاسم أو البريد أو الهاتف..."
            className="w-full rounded-xl border border-black/10 dark:border-white/15 bg-white/70 dark:bg-white/5 pr-9 pl-4 py-2.5 text-sm outline-none focus:border-primary transition"
          />
        </div>
        <select value={programFilter} onChange={(e) => setProgramFilter(e.target.value)} className={selectClass}>
          <option value="all">كل البرامج</option>
          <option value="memorization">حفظ</option>
          <option value="revision">مراجعة</option>
          <option value="tajweed">تجويد</option>
        </select>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className={selectClass}>
          <option value="all">كل الحالات</option>
          <option value="pending">قيد المراجعة</option>
          <option value="active">نشط</option>
          <option value="paused">متوقف</option>
          <option value="completed">مكتمل</option>
        </select>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-black/10 dark:border-white/10">
        <table className="w-full text-sm">
          <thead className="bg-black/[0.03] dark:bg-white/[0.04] text-right">
            <tr>
              <th className="px-4 py-3 font-bold">الاسم</th>
              <th className="px-4 py-3 font-bold">البرنامج</th>
              <th className="px-4 py-3 font-bold">المستوى</th>
              <th className="px-4 py-3 font-bold">الهاتف / واتساب</th>
              <th className="px-4 py-3 font-bold">الموعد</th>
              <th className="px-4 py-3 font-bold">الحالة</th>
              <th className="px-4 py-3 font-bold">الحساب</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((s) => (
              <tr key={s.id} className="border-t border-black/5 dark:border-white/5">
                <td className="px-4 py-3">
                  <div className="font-bold">{s.full_name}</div>
                  <div className="text-xs opacity-50">{s.email}</div>
                </td>
                <td className="px-4 py-3">{programLabel[s.program]}</td>
                <td className="px-4 py-3 text-xs opacity-70">
                  {s.level === "beginner" ? "مبتدئ" : s.level === "intermediate" ? "متوسط" : "متقدم"}
                </td>
                <td className="px-4 py-3 text-xs">{s.whatsapp}</td>
                <td className="px-4 py-3 text-xs opacity-70">
                  {s.preferred_time === "morning" ? "صباحاً" : s.preferred_time === "afternoon" ? "عصراً" : "مساءً"}
                </td>
                <td className="px-4 py-3">
                  <select
                    value={s.status}
                    disabled={isPending}
                    onChange={(e) => handleStatusChange(s.id, e.target.value as StudentRow["status"])}
                    className={`text-xs font-bold rounded-full px-3 py-1.5 border-0 outline-none cursor-pointer ${statusColor[s.status]}`}
                  >
                    {Object.entries(statusLabel).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-3">
                  {s.user_id ? (
                    <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                      <Link2 className="w-3 h-3" /> مربوط
                    </span>
                  ) : (
                    <select
                      defaultValue=""
                      disabled={isPending}
                      onChange={(e) => e.target.value && handleLinkUser(s.id, e.target.value)}
                      className="text-xs rounded-lg border border-black/10 dark:border-white/15 bg-white/70 dark:bg-white/5 px-2 py-1 outline-none focus:border-primary"
                    >
                      <option value="">اربط بحساب...</option>
                      {availableUsers.map((u) => (
                        <option key={u.id} value={u.id}>
                          {u.full_name}
                        </option>
                      ))}
                    </select>
                  )}
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center opacity-50">
                  لا يوجد طلاب مطابقين لبحثك
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
