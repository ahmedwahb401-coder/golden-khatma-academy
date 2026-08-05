import { z } from "zod";

export const registrationSchema = z.object({
  full_name: z.string().min(3, "الاسم لازم يكون 3 أحرف على الأقل"),
  age: z.coerce.number().int().min(4, "العمر غير صحيح").max(90, "العمر غير صحيح"),
  country: z.string().min(2, "من فضلك أدخل الدولة"),
  city: z.string().min(2, "من فضلك أدخل المدينة"),
  phone: z.string().min(8, "رقم الهاتف غير صحيح"),
  whatsapp: z.string().min(8, "رقم الواتساب غير صحيح"),
  email: z.string().email("البريد الإلكتروني غير صحيح"),
  gender: z.enum(["male", "female"], { errorMap: () => ({ message: "اختر النوع" }) }),
  program: z.enum(["memorization", "revision", "tajweed"], {
    errorMap: () => ({ message: "اختر البرنامج" }),
  }),
  level: z.enum(["beginner", "intermediate", "advanced"], {
    errorMap: () => ({ message: "اختر المستوى" }),
  }),
  memorized_parts: z.coerce.number().int().min(0).max(30),
  preferred_time: z.enum(["morning", "afternoon", "evening"], {
    errorMap: () => ({ message: "اختر الموعد المناسب" }),
  }),
});

export type RegistrationInput = z.infer<typeof registrationSchema>;
