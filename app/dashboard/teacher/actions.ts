"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@/lib/auth";

async function requireTeacherCourse(courseId: string) {
  const user = await getCurrentUser();
  if (!user || (user.role !== "teacher" && user.role !== "admin")) {
    throw new Error("unauthorized");
  }
  return user;
}

export async function logSession(input: {
  course_id: string;
  attendance_status: "present" | "absent" | "excused";
  surah: string;
  from_ayah: number | null;
  to_ayah: number | null;
  grade: number | null;
  notes: string;
}) {
  try {
    await requireTeacherCourse(input.course_id);
  } catch {
    return { error: "غير مصرّح لك بهذا الإجراء" };
  }

  const supabase = await createClient();
  const today = new Date().toISOString().slice(0, 10);

  const { error: attError } = await supabase.from("attendance").insert([
    {
      course_id: input.course_id,
      session_date: today,
      status: input.attendance_status,
    },
  ]);

  if (attError) return { error: "حدث خطأ أثناء تسجيل الحضور" };

  if (input.attendance_status === "present" && input.surah) {
    const { error: memError } = await supabase.from("memorization").insert([
      {
        course_id: input.course_id,
        session_date: today,
        surah: input.surah,
        from_ayah: input.from_ayah,
        to_ayah: input.to_ayah,
        grade: input.grade,
        notes: input.notes,
      },
    ]);
    if (memError) return { error: "تم تسجيل الحضور، لكن حدث خطأ أثناء تسجيل التسميع" };
  }

  revalidatePath("/dashboard/teacher");
  return { success: true };
}
