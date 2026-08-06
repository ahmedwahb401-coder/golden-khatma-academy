"use client";

import { useMemo, useState, useTransition } from "react";
import { Search, Link2, Unlink } from "lucide-react";
import {
  updateStudentStatus,
  linkStudentUser,
} from "@/app/admin/students/actions";
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
  const [programFilter, setProgramFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isPending, startTransition] = useTransition();
  const [rows, setRows] = useState(students);

  const filtered = useMemo(() => {
    return rows.filter((s) => {
      const matchesQuery =
        query.trim() === "" ||
        s.full_name.includes(query) ||
        s.email.toLowerCase().includes(query.toLowerCase()) ||
        s.phone.includes(query);

      const matchesProgram =
        programFilter === "all" || s.program === programFilter;

      const matchesStatus =
        statusFilter === "all" || s.status === statusFilter;

      return matchesQuery && matchesProgram && matchesStatus;
    });
  }, [rows, query, programFilter, statusFilter]);

  function handleStatusChange(id: string, status: StudentRow["status"]) {
    setRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );

    startTransition(async () => {
      const res = await updateStudentStatus(id, status);

      if (res?.error) {
        setRows(students);
      }
    });
  }

  function handleLinkUser(
    id: string,
    userId: string | null,
    fullName?: string
  ) {
    setRows((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
            ...r,
            user_id: userId,
            linked_user_name: fullName ?? null,
          }
          : r
      )
    );

    startTransition(async () => {
      const res = await linkStudentUser(id, userId);

      if (res?.error) {
        setRows(students);
      }
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

        <select
          value={programFilter}
          onChange={(e) => setProgramFilter(e.target.value)}
          className={selectClass}
        >
          <option value="all">كل البرامج</option>
          <option value="memorization">حفظ</option>
          <option value="revision">مراجعة</option>
          <option value="tajweed">تجويد</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className={selectClass}
        >
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
              <th className="px-4 py-3">الاسم</th>
              <th className="px-4 py-3">البرنامج</th>
              <th className="px-4 py-3">المستوى</th>
              <th className="px-4 py-3">الهاتف</th>
              <th className="px-4 py-3">الموعد</th>
              <th className="px-4 py-3">الحالة</th>
              <th className="px-4 py-3">الحساب</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((s) => (
              <tr
                key={s.id}
                className="border-t border-black/5 dark:border-white/5"
              >
                <td className="px-4 py-3">
                  <div className="font-bold">{s.full_name}</div>
                  <div className="text-xs opacity-50">{s.email}</div>
                </td>

                <td>{programLabel[s.program]}</td>

                <td className="text-xs opacity-70">
                  {s.level === "beginner"
                    ? "مبتدئ"
                    : s.level === "intermediate"
                      ? "متوسط"
                      : "متقدم"}
                </td>

                <td className="text-xs">{s.whatsapp}</td>

                <td className="text-xs opacity-70">
                  {s.preferred_time === "morning"
                    ? "صباحاً"
                    : s.preferred_time === "afternoon"
                      ? "عصراً"
                      : "مساءً"}
                </td>

                <td>
                  <select
                    value={s.status}
                    disabled={isPending}
                    onChange={(e) =>
                      handleStatusChange(
                        s.id,
                        e.target.value as StudentRow["status"]
                      )
                    }
                    className={`text-xs font-bold rounded-full px-3 py-1.5 border-0 ${statusColor[s.status]}`}
                  >
                    {Object.entries(statusLabel).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </td>

                <td className="py-3">
                  {s.user_id ? (
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-emerald-600">
                        <Link2 className="w-3 h-3" />

                        <span className="text-xs font-bold">
                          {s.linked_user_name || "حساب مربوط"}
                        </span>
                      </div>

                      <button
                        disabled={isPending}
                        onClick={() =>
                          handleLinkUser(s.id, null)
                        }
                        className="text-red-600 text-xs flex items-center gap-1 hover:underline"
                      >
                        <Unlink className="w-3 h-3" />
                        فك الربط
                      </button>
                    </div>
                  ) : (
                    <select
                      defaultValue=""
                      disabled={isPending}
                      onChange={(e) => {
                        const user = availableUsers.find(
                          (u) => u.id === e.target.value
                        );

                        if (user) {
                          handleLinkUser(
                            s.id,
                            user.id,
                            user.full_name
                          );
                        }
                      }}
                      className="text-xs rounded-lg border border-black/10 dark:border-white/15 bg-white/70 dark:bg-white/5 px-2 py-1"
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
                <td colSpan={7} className="text-center py-10 opacity-50">
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