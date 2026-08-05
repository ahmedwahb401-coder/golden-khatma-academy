"use client";

import { useMemo, useState } from "react";
import { Search, Plus } from "lucide-react";
import { togglePaymentStatus } from "@/app/admin/payments/actions";
import PaymentFormPanel from "./PaymentFormPanel";

export type PaymentRow = {
  id: string;
  amount: number;
  month: string;
  status: "paid" | "unpaid";
  student_id: string;
  students: { full_name: string } | null;
};

export default function PaymentsTable({
  payments,
  students,
}: {
  payments: PaymentRow[];
  students: { id: string; full_name: string }[];
}) {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [showPanel, setShowPanel] = useState(false);
  const [rows, setRows] = useState(payments);

  const filtered = useMemo(() => {
    return rows.filter((p) => {
      const name = p.students?.full_name || "";
      const matchesQuery = query.trim() === "" || name.includes(query);
      const matchesStatus = statusFilter === "all" || p.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [rows, query, statusFilter]);

  async function handleToggle(id: string, current: "paid" | "unpaid") {
    const next = current === "paid" ? "unpaid" : "paid";
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status: next } : r)));
    const res = await togglePaymentStatus(id, next);
    if (res?.error) setRows(payments);
  }

  const totalPaid = filtered.filter((p) => p.status === "paid").reduce((s, p) => s + Number(p.amount), 0);

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 opacity-40" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ابحث باسم الطالب..."
            className="w-full rounded-xl border border-black/10 dark:border-white/15 bg-white/70 dark:bg-white/5 pr-9 pl-4 py-2.5 text-sm outline-none focus:border-primary transition"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg border border-black/10 dark:border-white/15 bg-white/70 dark:bg-white/5 px-3 py-1.5 text-xs outline-none focus:border-primary transition"
        >
          <option value="all">كل الحالات</option>
          <option value="paid">مدفوع</option>
          <option value="unpaid">غير مدفوع</option>
        </select>
        <button
          onClick={() => setShowPanel(true)}
          className="flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-bold text-white transition hover:opacity-90 bg-primary whitespace-nowrap"
        >
          <Plus className="w-4 h-4" /> تسجيل دفعة
        </button>
      </div>

      {showPanel && <PaymentFormPanel students={students} onClose={() => setShowPanel(false)} />}

      <p className="text-sm opacity-60 mb-3">
        إجمالي المدفوع (حسب الفلترة الحالية): <span className="font-bold text-primary">{totalPaid.toLocaleString("ar-EG")} جنيه</span>
      </p>

      <div className="overflow-x-auto rounded-2xl border border-black/10 dark:border-white/10">
        <table className="w-full text-sm">
          <thead className="bg-black/[0.03] dark:bg-white/[0.04] text-right">
            <tr>
              <th className="px-4 py-3 font-bold">الطالب</th>
              <th className="px-4 py-3 font-bold">الشهر</th>
              <th className="px-4 py-3 font-bold">المبلغ</th>
              <th className="px-4 py-3 font-bold">الحالة</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="border-t border-black/5 dark:border-white/5">
                <td className="px-4 py-3 font-bold">{p.students?.full_name || "—"}</td>
                <td className="px-4 py-3 text-xs opacity-70">
                  {new Date(p.month).toLocaleDateString("ar-EG", { year: "numeric", month: "long" })}
                </td>
                <td className="px-4 py-3">{Number(p.amount).toLocaleString("ar-EG")} جنيه</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleToggle(p.id, p.status)}
                    className={`text-xs font-bold rounded-full px-3 py-1.5 transition ${
                      p.status === "paid"
                        ? "bg-emerald-500/10 text-emerald-600"
                        : "bg-amber-500/10 text-amber-600"
                    }`}
                  >
                    {p.status === "paid" ? "مدفوع" : "غير مدفوع"}
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-10 text-center opacity-50">
                  لا يوجد مدفوعات مطابقة
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
