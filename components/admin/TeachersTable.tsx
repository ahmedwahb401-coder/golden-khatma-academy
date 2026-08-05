"use client";

import { useMemo, useState } from "react";
import { Search, Plus, Pencil, Trash2, Award, Link2 } from "lucide-react";
import { deleteTeacher, linkTeacherUser } from "@/app/admin/teachers/actions";
import TeacherFormPanel, { type TeacherFormValue } from "./TeacherFormPanel";

export type TeacherRow = TeacherFormValue & { id: string };

export default function TeachersTable({
  teachers,
  availableUsers,
}: {
  teachers: TeacherRow[];
  availableUsers: { id: string; full_name: string }[];
}) {
  const [query, setQuery] = useState("");
  const [genderFilter, setGenderFilter] = useState<string>("all");
  const [panel, setPanel] = useState<null | TeacherFormValue>(null);
  const [showPanel, setShowPanel] = useState(false);

  const filtered = useMemo(() => {
    return teachers.filter((t) => {
      const matchesQuery = query.trim() === "" || t.full_name.includes(query);
      const matchesGender = genderFilter === "all" || t.gender === genderFilter;
      return matchesQuery && matchesGender;
    });
  }, [teachers, query, genderFilter]);

  async function handleDelete(id: string, name: string) {
    if (!window.confirm(`متأكد إنك عايز تحذف "${name}"؟ الإجراء ده لا يمكن التراجع عنه.`)) return;
    await deleteTeacher(id);
  }

  async function handleLink(id: string, userId: string) {
    if (!userId) return;
    await linkTeacherUser(id, userId);
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 opacity-40" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ابحث بالاسم..."
            className="w-full rounded-xl border border-black/10 dark:border-white/15 bg-white/70 dark:bg-white/5 pr-9 pl-4 py-2.5 text-sm outline-none focus:border-primary transition"
          />
        </div>
        <select
          value={genderFilter}
          onChange={(e) => setGenderFilter(e.target.value)}
          className="rounded-lg border border-black/10 dark:border-white/15 bg-white/70 dark:bg-white/5 px-3 py-1.5 text-xs outline-none focus:border-primary transition"
        >
          <option value="all">الكل</option>
          <option value="male">محفّظون</option>
          <option value="female">محفّظات</option>
        </select>
        <button
          onClick={() => {
            setPanel(null);
            setShowPanel(true);
          }}
          className="flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-bold text-white transition hover:opacity-90 bg-primary whitespace-nowrap"
        >
          <Plus className="w-4 h-4" /> إضافة محفّظ/محفّظة
        </button>
      </div>

      {showPanel && (
        <TeacherFormPanel
          initial={panel}
          onClose={() => {
            setShowPanel(false);
            setPanel(null);
          }}
        />
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((t) => (
          <div
            key={t.id}
            className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 p-5 flex flex-col gap-2"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="font-bold">{t.full_name}</div>
                <div className="text-xs opacity-60">{t.gender === "male" ? "محفّظ" : "محفّظة"}</div>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => {
                    setPanel(t);
                    setShowPanel(true);
                  }}
                  aria-label="تعديل"
                  className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/10"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(t.id, t.full_name)}
                  aria-label="حذف"
                  className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-red-500/10 text-red-600"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            {t.specialty && <div className="text-sm opacity-70">{t.specialty}</div>}
            {t.ijazah && <div className="text-xs opacity-60">{t.ijazah}</div>}
            <div className="text-xs flex items-center gap-1 opacity-60 mt-1">
              <Award className="w-3 h-3" /> {t.years_experience} سنوات خبرة
            </div>
            {t.user_id ? (
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 mt-1">
                <Link2 className="w-3 h-3" /> حساب مربوط
              </span>
            ) : (
              <select
                defaultValue=""
                onChange={(e) => handleLink(t.id, e.target.value)}
                className="mt-1 text-xs rounded-lg border border-black/10 dark:border-white/15 bg-white/70 dark:bg-white/5 px-2 py-1 outline-none focus:border-primary"
              >
                <option value="">اربط بحساب...</option>
                {availableUsers.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.full_name}
                  </option>
                ))}
              </select>
            )}
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="sm:col-span-2 lg:col-span-3 text-center opacity-50 py-10">
            لا يوجد محفّظون مطابقون لبحثك
          </div>
        )}
      </div>
    </div>
  );
}
