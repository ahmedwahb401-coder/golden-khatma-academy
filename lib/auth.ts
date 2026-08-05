import { createClient } from "@/lib/supabase/server";

export type AppUser = {
  id: string;
  email: string | null;
  full_name: string;
  role: "admin" | "teacher" | "student";
  gender: "male" | "female" | null;
};

// يجيب بيانات المستخدم الحالي مع دوره (admin/teacher/student) من جدول public.users.
// يرجّع null لو مفيش مستخدم مسجّل دخوله.
export async function getCurrentUser(): Promise<AppUser | null> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile } = await supabase
    .from("users")
    .select("full_name, role, gender")
    .eq("id", user.id)
    .single();

  if (!profile) return null;

  return {
    id: user.id,
    email: user.email ?? null,
    full_name: profile.full_name,
    role: profile.role,
    gender: profile.gender,
  };
}
