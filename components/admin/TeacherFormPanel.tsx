"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { addTeacher, updateTeacher, type TeacherInput } from "@/app/admin/teachers/actions";

const inputClass =
  "w-full rounded-xl border border-black/10 dark:border-white/15 bg-white/70 dark:bg-white/5 px-4 py-2.5 text-sm focus:border-primary outline-none transition";
const labelClass = "text-xs font-bold mb-1 block opacity-70";

export type TeacherFormValue = TeacherInput & { id?: string; user_id?: string | null };

export default function TeacherFormPanel({
  initial,
  onClose,
}: {
  initial: TeacherFormValue | null;
  onClose: () => void;
}) {
  const [values, setValues] = useState<TeacherFormValue>(
    initial || {
      full_name: "",
      gender: "male",
      ijazah: "",
      specialty: "",
      years_experience: 0,
      bio: "",
    }
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const payload: TeacherInput = {
      full_name: values.full_name,
      gender: values.gender,
      ijazah: values.ijazah,
      specialty: values.specialty,
      years_experience: Number(values.years_experience),
      bio: values.bio,
    };

    const res = values.id ? await updateTeacher(values.id, payload) : await addTeacher(payload);

    setLoading(false);
    if (res?.error) {
      setError(res.error);
      return;
    }
    onClose();
  }

  return (
    <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 mb-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-bold">{values.id ? "تعديل بيانات" : "إضافة محفّظ / محفّظة"}</h3>
        <button onClick={onClose} aria-label="إغلاق" className="opacity-60 hover:opacity-100">
          <X className="w-4 h-4" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>الاسم بالكامل</label>
          <input
            required
            className={inputClass}
            value={values.full_name}
            onChange={(e) => setValues((v) => ({ ...v, full_name: e.target.value }))}
          />
        </div>
        <div>
          <label className={labelClass}>الجنس</label>
          <select
            className={inputClass}
            value={values.gender}
            onChange={(e) => setValues((v) => ({ ...v, gender: e.target.value as "male" | "female" }))}
          >
            <option value="male">محفّظ (رجل)</option>
            <option value="female">محفّظة (امرأة)</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>الإجازة</label>
          <input
            className={inputClass}
            placeholder="مثال: إجازة برواية حفص عن عاصم"
            value={values.ijazah}
            onChange={(e) => setValues((v) => ({ ...v, ijazah: e.target.value }))}
          />
        </div>
        <div>
          <label className={labelClass}>التخصص</label>
          <input
            className={inputClass}
            placeholder="مثال: تحفيظ مبتدئين"
            value={values.specialty}
            onChange={(e) => setValues((v) => ({ ...v, specialty: e.target.value }))}
          />
        </div>
        <div>
          <label className={labelClass}>سنوات الخبرة</label>
          <input
            type="number"
            min={0}
            className={inputClass}
            value={values.years_experience}
            onChange={(e) => setValues((v) => ({ ...v, years_experience: Number(e.target.value) }))}
          />
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass}>نبذة تعريفية</label>
          <textarea
            rows={3}
            className={inputClass}
            value={values.bio}
            onChange={(e) => setValues((v) => ({ ...v, bio: e.target.value }))}
          />
        </div>

        {error && <p className="sm:col-span-2 text-sm text-red-600">{error}</p>}

        <div className="sm:col-span-2 flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="rounded-xl px-6 py-2.5 text-sm font-bold text-white transition hover:opacity-90 disabled:opacity-60 bg-primary"
          >
            {loading ? "جاري الحفظ..." : values.id ? "حفظ التعديلات" : "إضافة"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl px-6 py-2.5 text-sm font-bold border border-black/10 dark:border-white/15"
          >
            إلغاء
          </button>
        </div>
      </form>
    </div>
  );
}
