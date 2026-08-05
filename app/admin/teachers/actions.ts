"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@/lib/auth";

export type TeacherInput = {
  full_name: string;
  gender: "male" | "female";
  ijazah: string;
  specialty: string;
  years_experience: number;
  bio: string;
};

async function requireAdmin() {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    throw new Error("غير مصرّح لك بهذا الإجراء");
  }
}

export async function linkTeacherUser(teacherId: string, userId: string | null) {
  try {
    await requireAdmin();
  } catch {
    return { error: "غير مصرّح لك بهذا الإجراء" };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("teachers").update({ user_id: userId }).eq("id", teacherId);

  if (error) return { error: "حدث خطأ أثناء ربط الحساب" };

  revalidatePath("/admin/teachers");
  return { success: true };
}

export async function addTeacher(input: TeacherInput) {
  try {
    await requireAdmin();
  } catch {
    return { error: "غير مصرّح لك بهذا الإجراء" };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("teachers").insert([input]);

  if (error) return { error: "حدث خطأ أثناء إضافة المحفّظ/المحفّظة" };

  revalidatePath("/admin/teachers");
  return { success: true };
}

export async function updateTeacher(id: string, input: TeacherInput) {
  try {
    await requireAdmin();
  } catch {
    return { error: "غير مصرّح لك بهذا الإجراء" };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("teachers").update(input).eq("id", id);

  if (error) return { error: "حدث خطأ أثناء تعديل البيانات" };

  revalidatePath("/admin/teachers");
  return { success: true };
}

export async function deleteTeacher(id: string) {
  try {
    await requireAdmin();
  } catch {
    return { error: "غير مصرّح لك بهذا الإجراء" };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("teachers").delete().eq("id", id);

  if (error) return { error: "حدث خطأ أثناء الحذف" };

  revalidatePath("/admin/teachers");
  return { success: true };
}
