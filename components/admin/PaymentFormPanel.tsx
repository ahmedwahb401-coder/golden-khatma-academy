"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { addPayment } from "@/app/admin/payments/actions";

const inputClass =
  "w-full rounded-xl border border-black/10 dark:border-white/15 bg-white/70 dark:bg-white/5 px-4 py-2.5 text-sm focus:border-primary outline-none transition";
const labelClass = "text-xs font-bold mb-1 block opacity-70";

export default function PaymentFormPanel({
  students,
  onClose,
}: {
  students: { id: string; full_name: string }[];
  onClose: () => void;
}) {
  const [studentId, setStudentId] = useState(students[0]?.id || "");
  const [amount, setAmount] = useState("");
  const [month, setMonth] = useState(() => new Date().toISOString().slice(0, 7));
  const [status, setStatus] = useState<"paid" | "unpaid">("unpaid");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!studentId) {
      setError("اختر طالباً أولاً");
      return;
    }
    setLoading(true);
    setError("");

    const res = await addPayment({
      student_id: studentId,
      amount: Number(amount),
      month: `${month}-01`,
      status,
    });

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
        <h3 className="font-bold">تسجيل دفعة جديدة</h3>
        <button onClick={onClose} aria-label="إغلاق" className="opacity-60 hover:opacity-100">
          <X className="w-4 h-4" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className={labelClass}>الطالب</label>
          <select className={inputClass} value={studentId} onChange={(e) => setStudentId(e.target.value)}>
            {students.map((s) => (
              <option key={s.id} value={s.id}>
                {s.full_name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>المبلغ (جنيه)</label>
          <input
            required
            type="number"
            className={inputClass}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div>
          <label className={labelClass}>الشهر</label>
          <input
            required
            type="month"
            className={inputClass}
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          />
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass}>الحالة</label>
          <select
            className={inputClass}
            value={status}
            onChange={(e) => setStatus(e.target.value as "paid" | "unpaid")}
          >
            <option value="unpaid">غير مدفوع</option>
            <option value="paid">مدفوع</option>
          </select>
        </div>

        {error && <p className="sm:col-span-2 text-sm text-red-600">{error}</p>}

        <div className="sm:col-span-2 flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="rounded-xl px-6 py-2.5 text-sm font-bold text-white transition hover:opacity-90 disabled:opacity-60 bg-primary"
          >
            {loading ? "جاري الحفظ..." : "إضافة"}
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
