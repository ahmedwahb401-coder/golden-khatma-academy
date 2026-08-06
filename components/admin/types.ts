export type StudentRow = {
  id: string;
  full_name: string;
  age: number;
  country: string;
  city: string;
  phone: string;
  whatsapp: string;
  email: string;
  gender: "male" | "female";
  program: "memorization" | "revision" | "tajweed";
  level: "beginner" | "intermediate" | "advanced";
  memorized_parts: number;
  preferred_time: "morning" | "afternoon" | "evening";
  status: "pending" | "active" | "paused" | "completed";
  created_at: string;

  user_id: string | null;

  // اسم الحساب المرتبط
  linked_user_name: string | null;
};

export const programLabel: Record<StudentRow["program"], string> = {
  memorization: "حفظ",
  revision: "مراجعة",
  tajweed: "تجويد",
};

export const statusLabel: Record<StudentRow["status"], string> = {
  pending: "قيد المراجعة",
  active: "نشط",
  paused: "متوقف",
  completed: "مكتمل",
};

export const statusColor: Record<StudentRow["status"], string> = {
  pending: "bg-amber-500/10 text-amber-600",
  active: "bg-emerald-500/10 text-emerald-600",
  paused: "bg-gray-500/10 text-gray-500",
  completed: "bg-blue-500/10 text-blue-600",
};