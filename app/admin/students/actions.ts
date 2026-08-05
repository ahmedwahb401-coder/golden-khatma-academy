"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@/lib/auth";

const ALLOWED_STATUSES = ["pending", "active", "paused", "completed"] as const;

export async function linkStudentUser(studentId: string, userId: string | null) {
  const user = await getCurrentUser();

  if (!user || user.role !== "admin") {
    return { error: "غير مصرّح لك بهذا الإجراء" };
  }

  const supabase = await createClient();

  const { error } = await supabase
    .from("students")
    .update({ user_id: userId })
    .eq("id", studentId);

  if (error) {
    return { error: "حدث خطأ أثناء ربط الحساب" };
  }

  revalidatePath("/admin/students");

  return { success: true };
}

export async function updateStudentStatus(
  studentId: string,
  status: string
) {
  const user = await getCurrentUser();

  if (!user || user.role !== "admin") {
    return { error: "غير مصرّح لك بهذا الإجراء" };
  }

  if (!ALLOWED_STATUSES.includes(status as (typeof ALLOWED_STATUSES)[number])) {
    return { error: "حالة غير صحيحة" };
  }

  const supabase = await createClient();

  const { error } = await supabase
    .from("students")
    .update({ status })
    .eq("id", studentId);

  if (error) {
    return { error: "حدث خطأ أثناء تحديث الحالة" };
  }

  revalidatePath("/admin/students");

  return { success: true };
}