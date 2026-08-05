import { createClient } from "@/lib/supabase/server";
import NotificationsPanel, { type NotificationRow } from "@/components/admin/NotificationsPanel";

export default async function AdminNotificationsPage() {
  const supabase = await createClient();

  const [{ data: students }, { data: recent }] = await Promise.all([
    supabase.from("students").select("id, full_name").order("full_name"),
    supabase
      .from("notifications")
      .select("id, channel, message, sent_at, students(full_name)")
      .order("sent_at", { ascending: false })
      .limit(10),
  ]);

  return (
    <div className="p-6 md:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold font-display">الإشعارات</h1>
        <p className="text-sm opacity-60 mt-1">أرسل تحديثاً لأي طالب عبر واتساب أو إيميل</p>
      </div>
      <NotificationsPanel students={students || []} recent={(recent as unknown as NotificationRow[]) || []} />
    </div>
  );
}
