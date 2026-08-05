import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";

// نقطة دخول موحّدة بعد تسجيل الدخول: توجّه كل مستخدم للوحته المخصّصة.
export default async function DashboardRouterPage() {
  const user = await getCurrentUser();

  if (!user) redirect("/login");

  if (user.role === "admin") redirect("/admin");
  if (user.role === "teacher") redirect("/dashboard/teacher");
  redirect("/dashboard/student");
}
