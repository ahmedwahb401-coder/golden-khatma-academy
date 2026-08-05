"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@/lib/auth";

export async function logReport(studentId: string, periodLabel: string) {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") return { error: "غير مصرّح لك بهذا الإجراء" };

  const supabase = await createClient();
  const { error } = await supabase.from("reports").insert([
    { student_id: studentId, period_label: periodLabel },
  ]);

  if (error) return { error: "حدث خطأ أثناء تسجيل التقرير" };

  revalidatePath("/admin/reports");
  return { success: true };
}
