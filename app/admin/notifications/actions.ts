"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@/lib/auth";

export async function sendNotification(input: {
  student_id: string;
  channel: "whatsapp" | "email";
  message: string;
}) {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return { error: "غير مصرّح لك بهذا الإجراء" };
  }

  const supabase = await createClient();

  // يسجّل الإشعار في قاعدة البيانات (يظهر فوراً في لوحة الطالب).
  // لإرسال فعلي عبر واتساب/إيميل، اربط هذه الدالة بخدمة خارجية مثل
  // Twilio (واتساب) أو Resend/SendGrid (إيميل) — راجع ملاحظة README.
  const { error } = await supabase.from("notifications").insert([input]);

  if (error) return { error: "حدث خطأ أثناء إرسال الإشعار" };

  revalidatePath("/admin/notifications");
  return { success: true };
}
