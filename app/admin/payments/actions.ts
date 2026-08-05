"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@/lib/auth";

async function requireAdmin() {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") throw new Error("unauthorized");
}

export async function addPayment(input: {
  student_id: string;
  amount: number;
  month: string; // YYYY-MM-DD (أول يوم في الشهر)
  status: "paid" | "unpaid";
}) {
  try {
    await requireAdmin();
  } catch {
    return { error: "غير مصرّح لك بهذا الإجراء" };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("payments").insert([
    {
      ...input,
      paid_at: input.status === "paid" ? new Date().toISOString() : null,
    },
  ]);

  if (error) return { error: "حدث خطأ أثناء إضافة السجل" };

  revalidatePath("/admin/payments");
  return { success: true };
}

export async function togglePaymentStatus(id: string, status: "paid" | "unpaid") {
  try {
    await requireAdmin();
  } catch {
    return { error: "غير مصرّح لك بهذا الإجراء" };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("payments")
    .update({ status, paid_at: status === "paid" ? new Date().toISOString() : null })
    .eq("id", id);

  if (error) return { error: "حدث خطأ أثناء تحديث الحالة" };

  revalidatePath("/admin/payments");
  return { success: true };
}
