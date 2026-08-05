import { Users, UserCheck, CreditCard, TrendingUp } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const [{ count: studentsCount }, { count: activeCount }, { data: payments }] = await Promise.all([
    supabase.from("students").select("*", { count: "exact", head: true }),
    supabase.from("students").select("*", { count: "exact", head: true }).eq("status", "active"),
    supabase.from("payments").select("amount").eq("status", "paid"),
  ]);

  const revenue = (payments || []).reduce((sum, p) => sum + Number(p.amount), 0);

  const cards = [
    { label: "إجمالي طلبات التسجيل", value: studentsCount ?? 0, icon: Users },
    { label: "الاشتراكات النشطة", value: activeCount ?? 0, icon: UserCheck },
    { label: "الإيرادات (جنيه)", value: revenue.toLocaleString("ar-EG"), icon: TrendingUp },
    { label: "مدفوعات مسجّلة", value: (payments || []).length, icon: CreditCard },
  ];

  return (
    <div className="p-6 md:p-8">
      <h1 className="text-2xl font-bold font-display mb-8">لوحة القيادة</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <div
              key={c.label}
              className="rounded-2xl p-5 border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5"
            >
              <Icon className="w-5 h-5 text-primary mb-3" strokeWidth={1.75} />
              <div className="text-2xl font-bold font-display">{c.value}</div>
              <div className="text-sm opacity-60 mt-1">{c.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
