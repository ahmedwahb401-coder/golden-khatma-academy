import { redirect } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Users, LayoutDashboard, GraduationCap, CreditCard, FileText, Bell, Settings } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import LogoutButton from "@/components/LogoutButton";
import RubElHizb from "@/components/RubElHizb";

export const metadata: Metadata = {
  title: "لوحة الإدارة",
  robots: { index: false, follow: false },
};

// كل الصفحات تحت /admin محمية بدور "admin" فقط. أي دور تاني بيترفض ويترحّل
// لصفحة /dashboard العامة، وأي حد مش مسجّل دخوله هيتحول لـ /login (عبر middleware.ts).
const NAV = [
  { href: "/admin", label: "لوحة القيادة", icon: LayoutDashboard, active: true },
  { href: "/admin/students", label: "الطلاب", icon: Users, active: true },
  { href: "/admin/teachers", label: "المحفّظون", icon: GraduationCap, active: true },
  { href: "/admin/payments", label: "المدفوعات", icon: CreditCard, active: true },
  { href: "/admin/reports", label: "التقارير", icon: FileText, active: true },
  { href: "/admin/notifications", label: "الإشعارات", icon: Bell, active: true },
  { href: "#", label: "الإعدادات", icon: Settings, active: false },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();

  if (!user) redirect("/login");
  if (user.role !== "admin") redirect("/dashboard");

  return (
    <div dir="rtl" className="min-h-screen flex">
      <aside className="w-60 shrink-0 border-l border-black/10 dark:border-white/10 hidden md:flex flex-col">
        <div className="flex items-center gap-2 px-5 py-4 border-b border-black/10 dark:border-white/10">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white bg-primary">
            <RubElHizb className="w-4 h-4" />
          </div>
          <span className="font-bold text-sm font-display">لوحة الإدارة</span>
        </div>
        <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
          {NAV.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm transition ${
                  item.active
                    ? "bg-primary/10 text-primary font-bold"
                    : "opacity-50 pointer-events-none"
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
                {!item.active && (
                  <span className="text-[10px] opacity-70 mr-auto">قريباً</span>
                )}
              </Link>
            );
          })}
        </nav>
        <div className="px-5 py-4 border-t border-black/10 dark:border-white/10 flex items-center justify-between">
          <span className="text-xs opacity-60 truncate">{user.full_name}</span>
          <LogoutButton />
        </div>
      </aside>

      <main className="flex-1 min-w-0">{children}</main>
    </div>
  );
}
