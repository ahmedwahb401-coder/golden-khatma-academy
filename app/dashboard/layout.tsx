import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { getCurrentUser } from "@/lib/auth";
import LogoutButton from "@/components/LogoutButton";
import RubElHizb from "@/components/RubElHizb";

export const metadata: Metadata = {
  title: "لوحة التحكم",
  robots: { index: false, follow: false },
};

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (user.role === "admin") redirect("/admin");

  return (
    <div dir="rtl" className="min-h-screen flex flex-col">
      <header className="border-b border-black/10 dark:border-white/10">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-5 py-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white bg-primary">
              <RubElHizb className="w-4 h-4" />
            </div>
            <span className="font-bold font-display">
              {user.role === "teacher" ? "لوحة المحفّظ" : "لوحة الطالب"}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm opacity-60 hidden sm:inline">{user.full_name}</span>
            <LogoutButton />
          </div>
        </div>
      </header>
      <main className="flex-1 max-w-5xl mx-auto px-5 py-10 w-full">{children}</main>
    </div>
  );
}
