"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { sendNotification } from "@/app/admin/notifications/actions";

const inputClass =
  "w-full rounded-xl border border-black/10 dark:border-white/15 bg-white/70 dark:bg-white/5 px-4 py-2.5 text-sm focus:border-primary outline-none transition";

export type NotificationRow = {
  id: string;
  channel: "whatsapp" | "email";
  message: string;
  sent_at: string;
  students: { full_name: string } | null;
};

export default function NotificationsPanel({
  students,
  recent,
}: {
  students: { id: string; full_name: string }[];
  recent: NotificationRow[];
}) {
  const [studentId, setStudentId] = useState(students[0]?.id || "");
  const [channel, setChannel] = useState<"whatsapp" | "email">("whatsapp");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!studentId || !message.trim()) return;
    setLoading(true);
    const res = await sendNotification({ student_id: studentId, channel, message });
    setLoading(false);
    if (!res?.error) {
      setSent(true);
      setMessage("");
      setTimeout(() => setSent(false), 3000);
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <form onSubmit={handleSend} className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 p-6 flex flex-col gap-4">
        <h3 className="font-bold">إرسال إشعار جديد</h3>

        <select className={inputClass} value={studentId} onChange={(e) => setStudentId(e.target.value)}>
          {students.map((s) => (
            <option key={s.id} value={s.id}>
              {s.full_name}
            </option>
          ))}
        </select>

        <select className={inputClass} value={channel} onChange={(e) => setChannel(e.target.value as any)}>
          <option value="whatsapp">واتساب</option>
          <option value="email">إيميل</option>
        </select>

        <textarea
          required
          rows={4}
          placeholder="نص الرسالة..."
          className={inputClass}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        {sent && <p className="text-sm text-emerald-600">تم إرسال الإشعار ✓</p>}

        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-sm font-bold text-white transition hover:opacity-90 disabled:opacity-60 bg-primary"
        >
          <Send className="w-4 h-4" /> {loading ? "جاري الإرسال..." : "إرسال"}
        </button>

        <p className="text-xs opacity-50 leading-relaxed">
          الإشعار بيتسجّل فوراً ويظهر في لوحة الطالب. للإرسال الفعلي عبر واتساب أو إيميل، اربط
          دالة الإرسال بخدمة خارجية (راجع README).
        </p>
      </form>

      <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 p-6">
        <h3 className="font-bold mb-4">آخر الإشعارات المُرسلة</h3>
        {recent.length === 0 ? (
          <p className="text-sm opacity-50">لا يوجد إشعارات بعد.</p>
        ) : (
          <ul className="flex flex-col gap-3">
            {recent.map((n) => (
              <li key={n.id} className="text-sm border-t border-black/5 dark:border-white/5 pt-3 first:border-0 first:pt-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold">{n.students?.full_name || "—"}</span>
                  <span className="text-xs opacity-50">{n.channel === "whatsapp" ? "واتساب" : "إيميل"}</span>
                </div>
                <p className="opacity-70 text-xs">{n.message}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
